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
		this.app.get('/lu', async (req, res) => await this.logUser(req, res));
		this.app.get('/userinfo', async (req, res) => await this.userInfo(req, res));
		this.app.get('/il', async (req, res) => await this.isLoggedRoute(req, res));
		// TEST
		this.app.get('/getusers', async (req, res) => {
				res.json(['mkaramuk', "saksoy", "rdeyirme", "aabduvak", "aergul", "egun", "fbulut"]);
		});
		this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
	}

	start()
	{
		this.app.listen(port, () => console.log(`Server is running on ${port}`));
	}

	async userInfo(req, res)
	{
		if(req.isLogged())
		{
			res.send(req.session.user);
			return ;
		}
		res.send(false);
	}

	async isLoggedRoute(req, res)
	{
		res.send(req.isLogged());
	}

	async logUser(req, res)
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