import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class MessageTemplateRight extends Component {
	render() {
		return (
			<div className="player1-text w-3/4 mobile hybrid flex justifty-end float-right mb-2">
				<div className="player1-text-place w-5/6 bg-blue-400 pl-2 pt-2 rounded-lg pb-2 pl-4 pr-4">
					<div className="text-info w-full pr-2 border-b-1 mb-2">
						<span className="text-owner text-xs">{this.props.fullname}</span>
						<span className="text-time float-right text-xs">{this.props.time}</span>
						<div className="clear"></div>
					</div>
					<p>{this.props.content}</p>
				</div>
				<div className=" w-1/6">
					<img src={this.props.profilephoto} alt="" className="m-auto rounded-full" />
				</div>
			</div>
		);
	}
}