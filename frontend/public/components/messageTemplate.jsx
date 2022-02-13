import { Component } from 'react';

export default class MessageTemplate extends Component
{
	//
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="chat-message mb-3 mt-1">
				<div className="flex items-end">
					<div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start">
						<div>
							<span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-white">
								{ this.props.content }
							</span>
						</div>
					</div>
					<img src={this.props.profilephoto} alt="My profile" className="w-10 h-10 rounded-full order-1" />				
				</div>
			</div>
		);
	}
}