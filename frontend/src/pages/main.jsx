import { Component } from "react";
import { faArrowRight, faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client';
import $ from 'jquery';

// Component import
import MessageTemplate from '../components/messageTemplate';
import ChannelTemplate from "../components/channelTemplate";
import Contacts from "../components/contacts";
import ProfileTemplate from "../components/profileTemplate";
import FTButton from "../components/ftbutton";

// CSS import
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.css';
import axios from "axios";

export default class Main extends Component
{
	constructor(props)
	{
		super(props);

		this.channel = 'genel';
		this.socket = io();
		this.socket.on('on-message-recieved', (fullname, message, avatar, time, channel) => this.onMessageRecieved(fullname, message, avatar, time, channel));
		this.socket.on('on-error', (errMsg) => console.log(errMsg));
		this.state = { 
			messages: [],
			channels: [],
			userinfo: {}
		};
	}

	async loadMessages()
	{
		// TODO: Bulunulan kanaldaki mesajları yükle
		var msgs =  (await axios.post('/gm')).data;
		for (var i = 0; i < msgs.length; i++)
			this.addMessage(msgs[i].content, msgs[i].owner.avatar, msgs[i].owner.fullname, this.formatTime(new Date(msgs[i].sendtime)));
	}

	async componentDidMount()
	{
		console.log((await axios.post('/gc')).data);
		document.body.style.backgroundImage = "url('https://signin.intra.42.fr/assets/background_login-a4e0666f73c02f025f590b474b394fd86e1cae20e95261a6e4862c2d0faa1b04.jpg')";
		this.sessionId = (await axios.get('/si')).data;
		await this.setState({
			...this.state,
			userinfo: (await axios.get('/userinfo')).data,
			channels: (await axios.post('/gc')).data
		});
		this.loadMessages();
	}

	formatTime(date)
	{
		var hours = date.getHours();
		var minutes = date.getMinutes();

		minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
		hours = hours < 10 ? '0' + hours.toString() : hours.toString();
		return (hours + ':' + minutes);
	}

	onMessageRecieved(fullname, message, avatar, time, channel)
	{
		if (channel.name === this.channel)
		{
			this.addMessage(message, avatar, fullname, this.formatTime(new Date(time)));
		}
		else
		{
			// TODO: "... kanalında mesaj geldi" şeklinde bildirim gönder
		}
	}

	sendMessage(msg)
	{
		this.socket.emit('on-message-send', msg, { name: 'genel', type: 'channel' }, this.sessionId);
	}

	keyPressedHandler(event)
	{
		if (event.key === 'Enter')
		{
			event.preventDefault();
			this.sendMessage(this.popMessage());
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

	addMessage(msg, pp, fullname, time)
	{
		if (msg)
		{
			var messages = this.state.messages;
			messages.push(<MessageTemplate time={time} fullname={fullname} content={msg} profilephoto={pp} key={messages.length}/> );
			this.setState({
				...this.state,
				messages: messages
			});
			// TODO: Scrollbar'ın her daim aşağıya inmesini engelle
			setTimeout(this.scrollDown, 100)
		}
	}

	onClickButton()
	{
		this.sendMessage(this.popMessage());
	}

	render()
	{
		return (
			<div style={{ position: 'relative' }} className={`h-screen overflow-hidden flex flex-row main-div`}>
				<div style={{ display: 'none' }} id="profileTemplate" >
					<div onClick={(e) => $('#profileTemplate').slideToggle()} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="w-full h-full bg-gray-900 bg-opacity-25" />
					<ProfileTemplate roles={this.state.userinfo.roles}
									username={this.state.userinfo.username}
									avatar={this.state.userinfo.avatar}
									onButtonHandler={(e) => $('#profileTemplate').slideToggle()} />
				</div>
				<div className="rightBar flex flex-col w-1/6">
					<div id="logo" className="logo bg-black border-solid border-1 py-2 flex flex-row justify-center items-center h-20">
						<div className="text-white">
							<svg className="w-10 h-10 fill-white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
								<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
							</svg>
						</div>
						<span className="text-white font-bold">Chat</span>
					</div>
					<div className="channel bg-gray-800 grow border-1 border-gray-400 hover:overflow-y-auto">
						{
							this.state.channels.map(ch =>
							{
								return (<ChannelTemplate name={ch.name}/>);
							})
						}
					</div>
				</div>
				<div className={`grow flex flex-col w-5/6 h-12/12`}>
					<nav className="nav-bar	bg-gray-800 flex flex-row h-2/12 border-1 border-gray-400">

						<div className="nav-mid w-11/12 h-full">
							<input type = "text" channelName = "search-bar bg-gray-800" style={{width:'100%', border:'0', backgroundColor:'#1F2937', color:'white', textAlign:'center'}} placeholder="Kullanıcı Adı Girin..."/>
							<Contacts/>
						</div>
						<div className="nav-end bg-gray-800 w-1/12 h-full flex flex-row text-center justify-center items-center border-l-2 border-gray-400">
							<div>
								<FontAwesomeIcon className="text-white mt-4" icon={faPlus} />
							</div>
						</div>
					</nav>


					<div className="message-area bg-blue-600 w-full flex-1 flex flex-col grow h-10/12">
						<div className="message-show bg-gray-800 w-full h-20 flex-auto grow p-1 overflow-y-auto" id="message-area">
							{this.state.messages}
						</div>
						<div className="message-type w-full h-1/6 float-left">
							<textarea onKeyPress={(e) => this.keyPressedHandler(e)} name="" id="" className="float-left w-10/12 rounded-none h-4/6 resize-none text-area p-2"></textarea>

							<FTButton className="w-2/12 h-4/6 message-send-button"
								onClick={(e) => this.onClickButton()}
								textColor="white"
								icon={faArrowRight}
								color="gray"
								toneValue="400"
								text="Gönder" />


							<div className="profile-button w-full h-2/6 text-center">
								<FTButton className="w-full h-full"
									onClick={(e) => $('#profileTemplate').slideToggle()}
									textColor="white"
									icon={faArrowUp}
									color="green"
									toneValue="500" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}