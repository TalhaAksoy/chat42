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

const colors = require('colors');

function message(msg, name=undefined, color='blue', type='LOG')
{
	let head = `[${type}]: `[color];
	name = name ? `{${name}} | ` : '';
	console.log(head + name + msg);
}

function error(msg, name=undefined)
{
	message(msg, name, 'red', 'ERROR');
}

function log(msg, name=undefined)
{
	message(msg, name, 'blue', 'LOG');
}

module.exports = {
	log,
	error
};