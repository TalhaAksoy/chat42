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

// messages koleksiyonu için veri alma ve kayıt etme şeması
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	sendtime: Date,
	content: String,
	receiver: mongoose.Schema.Types.ObjectId,
	messagenumber: Number
});

module.exports = messageSchema;