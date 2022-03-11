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

const BackendServer = require('./includes/backendServer');
const server		= new BackendServer();
server.start();

/* const DBMessages				= require('./includes/db/dbMessages');
const DBUser					= require('./includes/db/dbUsers');
const DBChannels				= require('./includes/db/dbChannels');

const { connectDB, closeDB }	= require('./includes/db/dbConnection');

async function main()
{
	await connectDB()
	var db = new DBMessages();
	var ch = new DBChannels();
	var usr = new DBUser();
	console.log(await db.getAllMessages(['username', 'fullname', 'avatar']));

	await closeDB(); 
}

main(); */