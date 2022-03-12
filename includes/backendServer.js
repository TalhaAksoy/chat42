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
const DBMessages			= require('./db/dbMessages');
const DBUsers				= require('./db/dbUsers');
const GetRouter				= require('./routers/getrouter');
const PostRouter			= require('./routers/postrouter');
const SocketManager 		= require('./socketmanager');
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
			secret: 'veryspecialkey', // TODO: bir şifre belirle
			resave: false,
			saveUninitialized: true
		}));
		this.app.use((req, res, next) =>
		{
			req.isLogged = function() { return (this.session && this.session.user) ? true : false };
			next();
		});

		// GET API
		this.getRouter = new GetRouter(this);
		// POST API
		this.postRouter = new PostRouter(this);
		// Geri kalan kısım React'a gidiyor
		this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
		// SOCKET
		this.socketManager = new SocketManager(this);
	}

	// Sunucuyu başlatır
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

	// Session üzerine kayıt edilen kullanıcı bilgisini alır
	getUser(sessionId)
	{
		return JSON.parse(this.sessionStore.sessions[sessionId]).user;
	}

	isLogged(sessionId)
	{
		return this.sessionStore.sessions[sessionId] ? true : false;
	}
}

module.exports = BackendServer;