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

const { log, error }		= require('./logger');

class SocketManager
{
	constructor(server)
	{
		this.server = server;
		this.server.sio.on('connection', (socket) => this.onSocketConnected(socket));
	}

	// sendmessage event'i için tetiklenecek fonksyion
	async onSendMessageHandler(message, sessionId, socket)
	{
		if (this.server.isLogged(sessionId))
		{
			var user = this.server.getUser(sessionId);
			this.server.sio.emit('emitmessage', user.fullname, message, user.avatar, Date.now());
			this.server.dbMessages.saveMessage({
				owner: user._id,
				sendtime: Date.now(),
				content: message
			});
		}
		else
		{
			error(`User is not logged. Session ID: ${sessionId}`);
			socket.emit('errormessage', "You aren't logged in");
		}
	}

	// Yeni bir soket bağlantısı gerçekleştiği zaman çalışır
	onSocketConnected(socket)
	{
		// Her soket için sendmessage event'ini bağla.
		socket.on('sendmessage', async (msg, si) => await this.onSendMessageHandler(msg, si, socket));
	}
}

module.exports = SocketManager;