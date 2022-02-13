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

const { Client } 	= require('pg');

class DBConnection
{
	#conn = undefined;

	constructor() { }

	async connect() {
		this.#conn = new Client({
			host: 'localhost',
			user: 'postgres',
			database: 'postgres'
		});

		await this.#conn.connect();
	}
	
	async queryByColumn(table, cols=undefined, id=undefined, idcol=undefined, ordercol=undefined, orderby=undefined)
	{
		var query = {
			text: `SELECT ${cols ? cols.join(',') : '*'} FROM ${table}`,
			values: id ? [id] : []
		};
		
		if(id)
			query.text += ` WHERE ${idcol} = \$1`;
		if(ordercol && orderby)
			query.text += `ORDER BY ${ordercol} ${orderby}`;
		return (await this.#conn.query(query)).rows;
	}

	async query(query)
	{
		return (await this.#conn.query(query));
	}

	async close()
	{
		await this.#conn.end();
	}
}

module.exports = DBConnection;