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
const	AbstractRouter	= require('./abstractrouter');
const	session			= require('express-session');
const	bodyParser		= require('body-parser');

class MainRouter extends AbstractRouter 
{
	constructor()
	{
		super();

		// Middleware'ler
		this.router.use(bodyParser.urlencoded({ extended: true }));
		this.router.use(bodyParser.json());

		// GET - is logged
		this.router.get('/il', (req, res) =>
		{
			if (req.isLogged())
				res.send('true');
			else
				res.send('false');
		});
	}
}

module.exports = MainRouter;