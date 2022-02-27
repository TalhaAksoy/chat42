import { Component } from "react";
import { faArrowRight, faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component import
import MessageTemplate from '../components/messageTemplate';
import ChannelTemplate from "../components/channelTemplate";

// CSS import
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.css';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			messages: [],
		};
	}

	async componentDidMount() {
		document.body.style.backgroundImage = "url('https://signin.intra.42.fr/assets/background_login-a4e0666f73c02f025f590b474b394fd86e1cae20e95261a6e4862c2d0faa1b04.jpg')";
		this.sessionId = "";
	}

	keyPressedHandler(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			let msg = this.popMessage();
			this.addMessage(msg, "https://avatars.githubusercontent.com/u/25377153?v=4");
		}
	}

	popMessage()
	{
		let textArea = document.querySelector(".text-area");
		let message = textArea.value;
		textArea.value = '';
		return (message);
	}

	scrollDown()
	{
		const message_area = document.getElementById("message-area");
		message_area.scroll(0, message_area.scrollHeight);
		clearInterval(this.interval);
	}

	addMessage(msg, pp)
	{
		var messages = this.state.messages;
		messages.push(<MessageTemplate content={ msg } profilephoto={ pp } key={messages.length}/> );
		this.setState({
			messages: messages
		});
		if (msg) {
			setTimeout(this.scrollDown, 300)
		}
	}

	onClickButton() {
		console.log("s")
		let msg = this.popMessage();
		this.addMessage(msg, "https://avatars.githubusercontent.com/u/25377153?v=4");
	}

	render() {
		return (
			<div className={`theme-${this.themeName} theme-Light h-screen overflow-hidden flex flex-row main-div`}>
				<div className="rightBar flex flex-col w-1/6">
					<div id="logo" className="logo bg-gray-800 border-solid border-1 py-2 flex flex-row justify-center items-center h-1/12">
						<div className="text-white">
							<svg className="w-10 h-10 fill-white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
								<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
							</svg>
						</div>
						<span className="text-white font-bold">Chat</span>
					</div>
					<div className="channel bg-gray-800 grow border-solid border-1 hover:overflow-y-auto">
						<ChannelTemplate channelName="Hello Worl! :D"></ChannelTemplate>
						<ChannelTemplate channelName="Hello World! :D"></ChannelTemplate>
					</div>
				</div>
				<div className={`grow flex flex-col w-5/6 h-12/12`}>
					<nav className="nav-bar bg-blue-600 flex flex-row h-2/12">

						<div className="nav-mid w-11/12 h-full">
						</div>
						<div className="nav-end bg-gray-300 w-1/12 h-full flex flex-row text-center justify-center items-center border-1">
							<div>
								<FontAwesomeIcon className="text-white mt-4" icon={faPlus} />
							</div>
						</div>
					</nav>


					<div className="message-area bg-blue-600 w-full flex-1 flex flex-col grow h-10/12">
						<div className="message-show bg-gray-800 w-full h-20 flex-auto grow overflow-y-auto" id="message-area">
							{/* <div className="message-show-2 bg-gray-800 w-full"></div>*/}
							{this.state.messages} 
						</div>
						<div className="message-type w-full h-1/6 float-left">
							<textarea onKeyPress={(e) => this.keyPressedHandler(e)} name="" id="" className="float-left w-10/12 rounded-none h-4/6 resize-none text-area p-2"></textarea>
							<button onClick={(e) => this.onClickButton()} className="bg-gray-300 w-2/12 h-4/6 message-send-button rounded-r-lg"><span className="text-white font-bold">Gönder</span><span> <FontAwesomeIcon className="text-white" icon={faArrowRight} /> </span></button>
							<div className="profile-button w-full h-2/6 text-center">
								<button className="bg-gray-600 w-full h-full"><span className="text-white"><FontAwesomeIcon className="text-white" icon={faArrowUp} /></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}