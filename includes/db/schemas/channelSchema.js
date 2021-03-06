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

// channels koleksiyonu için veri alma ve kayıt etme şeması
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const channelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	readpermission: {
		type: [String],
		default: ['student', 'admin', 'staff']
	},
	writepermission: {
		type: [String],
		default: ['student', 'admin', 'staff']
	},
	info: {
		type: String,
		default: 'There is no info for this channel :/'
	},
	photo: {
		type: String,
		default: '' // TODO: varsayılan kanal resmi ekle
	}
});

module.exports = channelSchema;