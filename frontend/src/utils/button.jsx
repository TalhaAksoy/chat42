import { Component } from 'react';
import 					'bootstrap/dist/css/bootstrap.css';
import { faArrowRight, faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MessageTemplate extends Component
{

	render()
	{
		return (
			<button 
				onClick={(e) => this.onClickButton(e)} 
				className="bg-gray-300 w-2/12 h-4/6 message-send-button rounded-r-lg">
				<span className="text-white font-bold"> gönder </span>
				<span> <FontAwesomeIcon className="text-white" icon={faArrowRight} /> </span>
			</button>
		);
	}
}