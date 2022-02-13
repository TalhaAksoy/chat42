import { Component } from 'react';

export default class ChannelTemplate extends Component {
	//
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="chat-message mb-0 mt-0 border-solid border-1">
				<div className="flex items-end">
					<div className="flex flex-col space-y-0 text-base max-w-xs mx-0 items-start">
						<div><span className="px-4 py-2 inline-block rounded-bl-none">
							<span> # </span><span className = "channel-name">{this.props.channelName}</span>
						</span></div>
					</div>
				</div>
			</div>
		);
	}
}