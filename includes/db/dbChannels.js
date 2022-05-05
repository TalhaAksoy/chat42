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

const mongo			= require('mongoose');
const channelSchema	= require('./schemas/channelSchema');

class DBChannels
{
	constructor()
	{
		this.model = mongo.model('channel', channelSchema);
	}

	#checkParam(arg)
	{
		if (!arg)
			throw new Error('Parameter cannot be null');
	}
	
	async #getch(search)
	{
		let queryResult = (await this.model.find(search))[0];
		if (!queryResult)
			throw new Error(`Channel couldn't found with ${search} filter`);

		return (queryResult);
	}

	async getChannelIdByName(name)
	{
		this.#checkParam(name);
		return ((await this.getChannelByName(name))._id);
	}

	async getChannelById(id)
	{
		this.#checkParam(id);
		return (await this.#getch({ id: id }));
	}

	async getChannelByName(chName)
	{
		this.#checkParam(chName);
		return (await this.#getch({ name: chName }));
	}

	async getAllChannels(filters={})
	{
		return (await this.model.find(filters));
	}
}

module.exports = DBChannels;