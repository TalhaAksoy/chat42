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
const { log, error }		= require('./logger');
const port					= 5000;

class BackendServer
{
	constructor()
	{
		this.sessionStore = new session.MemoryStore();
		this.app = express();
		this.server = http.createServer(this.app);
		this.sio = io(this.server);
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

		this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));

		// SOCKET
		this.sio.on('connection', (socket) => this.onConnectionHandler(socket));
	}

	start()
	{
		this.server.listen(port, () => console.log(`Server is running on ${port}`));
	}

	onNewMessageHandler(message, sessionId, socket)
	{
		if (this.isLogged(sessionId))
		{
			this.sio.emit('emitmessage', this.getUser(sessionId).login, message);			
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
		socket.on('sendmessage', (message, sessionId) => this.onNewMessageHandler(message, sessionId, socket));
	}

	getSessionIdRoute(req, res)
	{
		if (req.isLogged())
			res.send(req.session.id);
		else
			res.send("");
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