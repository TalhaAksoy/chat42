/*	42 İstanbul bünyesinde kullanılmak için tasarlanan mesajlaşma uygulaması
 *	Copyright (C) 2022 42 İstanbul
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <https://www.gnu.org/licenses/>.	
*/

const session				= require('express-session');
const bodyParser			= require('body-parser');
const express				= require('express');
const io					= require('socket.io');
const http					= require('http');
const path					= require('path');
const Api42					= require('./api');
const DBMessages			= require('./db/dbMessages');
const DBUsers				= require('./db/dbUsers');
const { log, error }		= require('./logger');
const { connectDB, closeDB }= require('./db/dbConnection');
const port					= 5000;

class BackendServer
{
	constructor()
	{
		this.sessionStore = new session.MemoryStore();
		this.app = express();
		this.server = http.createServer(this.app);
		this.sio = io(this.server);
		this.dbUsers = new DBUsers();
		this.dbMessages = new DBMessages();

		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(express.static(path.join(__dirname, '../frontend/build')));
		this.app.use(session({
			store: this.sessionStore,
			secret: 'veryspecialkey',
			resave: false,
			saveUninitialized: true
		}));
		this.app.use((req, res, next) =>
		{
			req.isLogged = function() { return this.session && this.session.user };
			next();
		});

		// GET
		this.app.get('/lu', async (req, res) => await this.logUserRoute(req, res));
		this.app.get('/userinfo', (req, res) => this.userInfoRoute(req, res));
		this.app.get('/il', (req, res) => this.isLoggedRoute(req, res));

		// POST
		this.app.post('/si', (req, res) => this.getSessionIdRoute(req, res));
		this.app.get('/gm', async (req, res) => await this.getMessagesRoute(req, res));

		// Geri kalan kısım React'a gidiyor
		this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));

		// SOCKET
		this.sio.on('connection', (socket) => this.onConnectionHandler(socket));
	}

	start()
	{	
		this.server.listen(port, async () => 
		{
			log(`Server is running on ${port}`)
			log('Connecting to the database...');
			await connectDB();
			log('Connected');
		});
	}

	async onNewMessageHandler(message, sessionId, socket)
	{
		if (this.isLogged(sessionId))
		{
			var user = await this.dbUsers.getUser(this.getUser(sessionId).login);
			this.sio.emit('emitmessage', user.username, message, user.avatar);
			this.dbMessages.saveMessage({
				owner: user.id,
				sendtime: Date.now(),
				content: message
			});
		}
		else
		{
			socket.emit('errormessage', "You aren't logged in");
		}
	}

	getUser(sessionId)
	{
		return JSON.parse(this.sessionStore.sessions[sessionId]).user;
	}

	onConnectionHandler(socket)
	{
		socket.on('sendmessage', async (message, sessionId) => await this.onNewMessageHandler(message, sessionId, socket));
	}

	getSessionIdRoute(req, res)
	{
		if (req.isLogged())
			res.send(req.session.id);
		else
			res.send("");
	}

	async getMessagesRoute(req, res)
	{
	/* 	if (req.isLogged()) */
			res.send(await this.dbMessages.getAllMessages(['username', 'fullname', 'avatar']));
		/* else
			res.send({}) */
	}

	userInfoRoute(req, res)
	{
		if(req.isLogged())
		{
			res.send(req.session.user);
			return ;
		}
		res.send(false);
	}

	isLoggedRoute(req, res)
	{
		res.send(req.isLogged());
	}

	async logUserRoute(req, res)
	{
		
		if (req.isLogged())
			log(`User already logged: ${req.session.user.login}`);
		else if (req.query && req.query.code)
		{
			try
			{
				let api = new Api42();
				req.session.user = await api.callApi(req.query.code, '/me');
			}
			catch(e)
			{ error(e); }
		}
		res.redirect('/');
	}

	isLogged(sessionId)
	{
		return this.sessionStore.sessions[sessionId] ? true : false;
	}
}

module.exports = BackendServer;