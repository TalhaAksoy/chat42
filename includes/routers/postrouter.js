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
 *rm -rf *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <https://www.gnu.org/licenses/>.	
*/

const express				= require('express');
const { log, error }		= require('../logger');

class PostRouter
{
	// Post isteklerinde ihtiyaç olması durumunda BackendServer (server)
	// nesnesi kullanılabilir.
	constructor(server)
	{
		this.server = server;
		this.router = express.Router();

		this.router.post('/gm', async (req, res) => await this.getMessages(req, res));

		// Router'ı server'a ekle.
		this.server.app.use(this.router);
	}

	async getMessages(req, res)
	{
		if (req.isLogged())
			res.send(await this.server.dbMessages.getMessage(['username', 'fullname', 'avatar'], req.query.start, req.query.end));
		else
			res.send({})
	}
}

module.exports = PostRouter;