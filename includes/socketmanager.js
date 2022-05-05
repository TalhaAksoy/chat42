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
	async onMessageSendHandler(message, socket, sessionId, channel)
	{
		if (this.server.isLogged(sessionId))
		{
			var user = this.server.getUser(sessionId);
			this.server.sio.emit('on-message-recieved', user.fullname, message, user.avatar, Date.now(), channel);
			this.server.dbMessages.saveMessage({
				owner: user._id,
				sendtime: Date.now(),
				content: message,
				to: {
					type: channel.type,
					id: (await this.server.dbChannels.getChannelIdByName(channel.name))
				}
			});
		}
		else
		{
			error(`User is not logged. Session ID: ${sessionId}`);
			this.emitError(socket, "You aren't logged in");
		}
	}
	
	emitError(socket, message)
	{
		socket.emit('on-error', message);
	}

	// Yeni bir soket bağlantısı gerçekleştiği zaman çalışır
	onSocketConnected(socket)
	{
		// Soket on-message-recieved event'ini bağla
		socket.on('on-message-send', async (msg, ch, si) => await this.onMessageSendHandler(msg, socket, si, ch));

		// Soket event'lerini bağla...
	}
}

module.exports = SocketManager;