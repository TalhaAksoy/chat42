import { Component }							from "react";
import { faArrowRight, faArrowUp, faPlus }		from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon }						from '@fortawesome/react-fontawesome';
import Contacts 								from '../components/contacts';
import MessageTemplate							from '../components/messageTemplate';
import ChannelTemplate 							from "../components/channelTemplate";	
import axios									from "axios";
import sio										from 'socket.io-client';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.module.css';

export default class Index extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { messages: [] };
	}

	async componentDidMount()
	{
		document.body.style.backgroundImage = "url('https://signin.intra.42.fr/assets/background_login-a4e0666f73c02f025f590b474b394fd86e1cae20e95261a6e4862c2d0faa1b04.jpg')";
		this.socket = sio();
		this.socket.connect();
		this.sid = (await axios.post('/si')).data;
	}

	sendMessage(text)
	{
		this.socket.emit('message', { msg: text, sid: this.sid });
	}
	handleKeyPress(event)
	{
		if (event.key === 'Enter')
		{
			event.preventDefault();
			this.handleSubmit(event);
		}
	}
	handleSubmit(event)
	{
		var textArea = document.querySelector(".text-area");
		this.sendMessage(textArea.value);
		var messages = this.state.messages;
		messages.push(<MessageTemplate content={ textArea.value } profilephoto = {"https://avatars.githubusercontent.com/u/25377153?v=4"}/>);
		this.setState({
			messages: messages
		});
		textArea.value = '';
		// TODO: message değişkenini ekranda da göster
	}

	render() {
		return (
			<div className={`theme-${this.themeName} theme-Light h-screen flex flex-row overflow-hidden main-div`}>
				<div className="rightBar flex flex-col w-1/6">
					<div id = "logo" className="logo bg-gray-800 grow border-solid border-1 py-2 flex flex-row justify-center items-center">
						<div className="text-white">
							<svg className="w-10 h-10 fill-white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
								<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
							</svg>
						</div>
						<span class = "text-white font-bold">Chat</span>
					</div>
					<div className="channel bg-gray-800 grow border-solid border-1  hover:overflow-y-auto">
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
						<ChannelTemplate channelName = "Hello World! :D"></ChannelTemplate>
					</div>
				</div>
				<div className={ `grow flex flex-col w-5/6`}>
					<nav className="nav-bar bg-blue-600 flex flex-row">

						<div className="nav-mid bg-green-600 w-11/12 h-full">
							<Contacts></Contacts>
						</div>
						<div className="nav-end bg-yellow-400 w-1/12 h-full text-center justify-center items-center">
							<div>
								<FontAwesomeIcon className="text-white mt-4" icon={faPlus} />
							</div>
						</div>
					</nav>


					<div className="mesage-area bg-blue-600 w-full flex flex-col grow">
						<div className={ "mesasge-show bg-gray-800 w-full h-20 grow overflow-y-auto" }>
							{  this.state.messages }
						</div>
						<div className="message-type bg-pink-500 w-full h-1/6 float-left">
							<textarea onKeyPress={ (e) => this.handleKeyPress(e) } name="" id="" className="float-left w-10/12 rounded-none h-4/6 resize-none text-area"></textarea>
							<button onClick={ (e) => this.handleSubmit(e) } className="bg-blue-600 w-2/12 h-4/6 message-send-button"><span className="text-white font-bold"> gönder </span><span> <FontAwesomeIcon className="text-white" icon={faArrowRight} /> </span></button>
							<div className="profile-button bg-red-600 w-full h-2/6 text-center">
								<button className="bg-gray-600 w-1/6 h-full"><span className="text-white"><FontAwesomeIcon className="text-white" icon={faArrowUp} /></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}