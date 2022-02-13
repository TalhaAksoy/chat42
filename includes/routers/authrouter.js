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

const AbstractRouter	= require('./abstractrouter');
const session			= require('express-session');
const Api42				= require('../api');
const { log, error }	= require('../logger');

class AuthRouter extends AbstractRouter
{
	constructor(mainRouter)
	{
		super();

		this.sessionStore = new session.MemoryStore();
		
		// Middleware'ler
		this.router.use(session({
			store: this.sessionStore,
			secret: 'veryspecialkey',
			resave: false,
			saveUninitialized: true
		}));
		this.router.use((req, res, next) =>
		{
			req.isLogged = function() { return this.session && this.session.user };
			next();
		});
		
		// GET - login user
		this.router.get('/lu', async (req, res) => this.logUser(req, res));
		this.router.get('/userinfo', async (req, res) => this.userInfo(req, res));
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

	isLogged(sessionId)
	{
		return this.sessionStore.sessions[sessionId] ? true : false;
	}

	async logUser(req, res)
	{
		
		if (req.isLogged())
		{
			res.send(true);
			log(`User already logged: ${req.session.user}`);
			return ;
		}
		else if (req.query && req.query.code)
		{
			try
			{
				let api = new Api42();
				req.session.user = await api.callApi(req.query.code, 'users/me');
				res.send(true);
				return ;
			}
			catch(e)
			{
				error(e);
			}
		}
		res.send(false);
	}
}

module.exports = AuthRouter;