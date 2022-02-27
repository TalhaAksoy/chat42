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
const axios		= require('axios');

class Token
{
	constructor({ code })
	{
		this.uid = 'a8c2bf8266a4802fbc28168b2b7b28fa3ff4f753ff22b39b49ad23920618a255';
		this.secret = '9c69161d797d1b7b07ab21a99630870cb4d8efcf26d29778c2c226757fc5e6a9';
		this.redirect = 'http%3A%2F%2Flocalhost%3A5000%2Flu'
		this.code = code;
		this.token = ''
	}

	async getToken()
	{
		var args = [];
		if (this.code)
		{
			args = [
				`grant_type=authorization_code`,
				`client_id=${this.uid}`,
				`client_secret=${this.secret}`,
				`code=${this.code}`,
				`redirect_uri=${this.redirect}`
			]
		}
		else 
			throw Error('Couldn\'t get code for generating token.');
		
		const data		= (await axios.post(`https://api.intra.42.fr/oauth/token?${args.join('&')}`)).data;
		this.token = data['access_token'];
		return (this.token);
	}
}

module.exports = Token;