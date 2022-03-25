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

const express				= require('express');
const callApi				= require('../api');
const { log, error }		= require('../logger');

class GetRouter
{
	// Get isteklerinde ihtiyaç olması durumunda BackendServer (server)
	// nesnesi kullanılabilir.
	constructor(server)
	{
		this.server = server;
		this.router = express.Router();

		// Is Logged? - Giriş durumunu istemciye gönder.
		this.router.get('/il', (req, res) => this.getIsLogged(req, res));
		// Login User - İstemciyi giriş yaptır.
		this.router.get('/lu', async (req, res) => await this.logUser(req, res));
		// Session ID - Session ID'yi istemciye gönder.
		this.router.get('/si', (req, res) => this.getSessionId(req, res));
		// TODO: Test için eklendi. Kaldırılacak.
		this.router.get('/userinfo', (req, res) => this.getUserInfo(req, res));
		// Router'ı server'a ekle.
		this.server.app.use(this.router);
	}

	getUserInfo(req, res)
	{
		if(req.isLogged())
		{
			res.send(req.session.user);
			return ;
		}
		res.send(false);
	}

	getSessionId(req, res)
	{
		if (req.isLogged())
			res.send(req.session.id);
		else
			res.send("");
	}


	async logUser(req, res)
	{
		if (req.isLogged())
			log(`User already logged: ${req.session.user.login}`);
		else if (req.query && req.query.code)
		{
			try
			{
				var data = await callApi(req.query.code, '/me');
				req.session.user = await this.server.dbUsers.getUser(data.login);
				if (!req.session.user)
				{
					var user = {
						username: data.login,
						avatar: data.image_url,
						fullname: data.displayname,
						roles:  ['student']
					};

					if (data['staff?'])
						user.roles.push('staff');
					if (data.login == 'mkaramuk' ||
						data.login == 'saksoy' ||
						data.login == 'aabduvak' ||
						data.login == 'fbulut')
						user.roles.push('admin');

					req.session.user = (await this.server.dbUsers.saveUser(user));
				}
			}
			catch(e)
			{ error(e); }
		}
		/*
		 *	Her iki durumda da kullanıcı yeniden ana sayfaya yönlendirilmeli.
		 *	Zaten istemci tarafında giriş yapılıp yapılmadığı kontrol edilerek
		 *	doğru sayafaya yönlendirme yapılacak.
		*/
		res.redirect('/');
	}

	getIsLogged(req, res)
	{
		res.send(req.isLogged());
	}
}

module.exports = GetRouter;