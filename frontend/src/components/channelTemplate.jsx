import { Component } from 'react';

export default class ChannelTemplate extends Component
{
	render()
	{
		return (
			<div className="chat-message mb-0 mt-1 border-solid mb-2 bg-gray-600">
				<div className="flex items-end">
					<div className="flex flex-col space-y-0 text-base max-w-xs mx-0 items-start">
						<div><span className="px-4 py-2 inline-block rounded-bl-none">
							<span  className = "text-white"> # </span><span className = "channel-name text-white">{this.props.name}</span>
						</span></div>
					</div>
				</div>
			</div>
		);
	}
}