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

const DBUser					= require('../includes/db/dbUsers');
const { connectDB, closeDB }	= require('../includes/db/dbConnection');
const mongo						= require('mongoose');
const db = new DBUser();

test('Veritabanına bağlan (DBUsers)', async () => 
{
	await connectDB();
});

test('Kullanıcı bilgilerini çek', async () =>
{
	const data = await db.getUser('fbulut');
	expect(data).toMatchObject({
		_id: new mongo.Types.ObjectId("622388972047bed6762fda4d"),
		username: 'fbulut',
		avatar: 'https://avatars.githubusercontent.com/u/25377153?v=4',
		fullname: 'Fatih Bulut',
		role: [ 'admin', 'staff', 'student' ],
		memberof: [ new mongo.Types.ObjectId("62238a1e2047bed6762fda64") ]
	  });
});

test('Veritabanı bağlantısını kes (DBUsers)', async () => 
{
	await closeDB();
});



