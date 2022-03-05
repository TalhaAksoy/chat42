import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class MessageTemplate extends Component {
	render() {
		return (
			<div className="chat-message mb-3 mt-1">
				<div className="flex items-center">
					<img src={this.props.profilephoto} alt="My profile" className="w-10 h-10 rounded-full order-1" />
					<div className="flex flex-row space-y-2 text-base max-w-xs mx-2 order-2 items-start">
						<span className="px-3 py-2 rounded-lg inline-block bg-gray-500 text-white message-content">
							<div className='message-user'>
								fbulut
							</div>
							<div className='message-content'>
								{this.props.content} 
							</div>
							<div className='text-sm message-time'>
								{this.props.time}
							</div>
						</span>
					</div>
				</div>
			</div>
		);
	}
}