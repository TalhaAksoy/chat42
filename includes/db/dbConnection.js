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

const mongo = require('mongoose');

class DBConnection
{
	constructor()
	{ }

	async connect()
	{
		return (await mongo.connect('mongodb+srv://ftadmin:dev2002@cluster0.a40py.mongodb.net/test'));
	}

	async close()
	{
		return (await mongo.connection.close());
	}
}

module.exports = {
	DBConnection
}

