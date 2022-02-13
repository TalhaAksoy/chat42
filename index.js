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
const MainRouter			= require('./includes/routers/mainrouter');
const AuthRouter			= require('./includes/routers/authrouter');
const app 					= express();
const port					= 5000

const mr = new MainRouter();
const ar = new AuthRouter();

app.use(ar.router);
app.use(mr.router);
app.listen(port, () => console.log(`Server is running on ${port}`));