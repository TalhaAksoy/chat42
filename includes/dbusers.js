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

const DBConnection	= require('./dbconnection');

class DBUser extends DBConnection
{
	constructor(conn)
	{
		super(conn);
	}

	async getUser(username)
	{
		return (await (this.queryByColumn('users', '*', username, 'username')))[0];
	}

	async setUser(obj)
	{
		try
		{
			var query = {
				text: "UPDATE users SET username = $1, roles = $2, pp = $3, fullname = $4 WHERE username = $1",
				values: [obj.username, obj.roles, obj.pp, obj.fullname]
			};


		}
		catch
		{
			var query = {
				text: "INSERT INTO users(username, roles, pp, fullname) VALUES ($1, $2, $3, $4)",
				values: [obj.username, obj.roles, obj.pp, obj.fullname]
			};
			
		}
	}
}