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
const axios = require('axios');
const Token = require('./token');
const { log } = require('./logger');

class Api42
{
	constructor()
	{

	}

	async callApi(code, endpoint)
	{
		var token = (await (new Token({code: code}).getToken()));
		const args = 
		[
			`access_code=${token}`,
			`token_type=bearer`
		];
		log(args.join('&'));
		const data = (await axios.get(`https://api.intra.42.fr/v2/${endpoint}/?${args.join('&')}`)).data;
		return (data);
	}
}

//UPDATE tablo_adi 
//SET ContactName = 'Alfred Schmidt', City= 'Frankfurt' 
//WHERE CustomerID = 1;
module.exports = Api42;