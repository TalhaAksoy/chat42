import { Component } from "react";
import { faArrowRight, faArrowUp, faPlus, faBookmark, faQuestion, faGear, faMessage, faUserGroup, faLock, faBell, faCirclePlus, faFaceGrin, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client';
import axios from "axios";
import $ from 'jquery';

// Component import
import MessageTemplateRight from '../components/messageTemplateRight';
import MessageTemplateLeft from "../components/messageTemplateLeft";
import Contacts from "../components/contacts";
import ProfileTemplate from "../components/profileTemplate";
import FTButton from "../components/ftbutton";

// CSS import
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/main.css';

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

	async loadMessages(channelName)
	{
		// TODO: Bulunulan kanaldaki mesajları yükle
		var msgs =  (await axios.post('/gm', { ch: channelName })).data;
		for (var i = 0; i < msgs.length; i++)
			this.addMessage(msgs[i].content, msgs[i].owner.avatar, msgs[i].owner.fullname, this.formatTime(new Date(msgs[i].sendtime)), msgs[i].owner.username);
	}

	async componentDidMount()
	{
		document.body.style.backgroundImage = "url('https://signin.intra.42.fr/assets/background_login-a4e0666f73c02f025f590b474b394fd86e1cae20e95261a6e4862c2d0faa1b04.jpg')";
		this.sessionId = (await axios.get('/si')).data;
		await this.setState({
			...this.state,
			userinfo: (await axios.get('/userinfo')).data,
			channels: (await axios.post('/gc')).data
		});
		this.loadMessages(this.channel);
		
		$(document).ready(function()
		{
			console.log("Bedava Robux İstiyorsan => https://www.kisa.link/Q0xB");
			console.log(":D");
			console.log("⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄");
			console.log("⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄");
			console.log("⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄");
			console.log("⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄");
			console.log("⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰");
			console.log("⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤");
			console.log("⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗");
			console.log("⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄");
			console.log("⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄");
			console.log("⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄");
			console.log("⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄");
			console.log("⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄");
			console.log("⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄");
			console.log("⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴");
			console.log("⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿");
			/////////////////////////////////////////////////////
			$(".icon-1").addClass("active");
			$(".mobile-bottom-message").removeClass("none");
			$(".icon-1-desktop").addClass("active");
			$('.menu-1').click(function() {
				$(".chat-place-message").removeClass('none');
				$(".chat-place-group-message").addClass('none');
				$(".chat-place-dm-message").addClass('none');
				$(".icon-1-desktop").addClass("active");
				$(".icon-2-desktop").removeClass("active");
				$(".icon-3-desktop").removeClass("active");
				$(".icon-4-desktop").removeClass("active");
			});
			$('.menu-2').click(function() {
				$(".chat-place-message").addClass('none');
				$(".chat-place-group-message").removeClass('none');
				$(".chat-place-dm-message").addClass('none');
				$(".icon-1-desktop").removeClass("active");
				$(".icon-2-desktop").addClass("active");
				$(".icon-3-desktop").removeClass("active");
				$(".icon-4-desktop").removeClass("active");
			});
			$('.menu-3').click(function() {
				$(".chat-place-message").addClass('none');
				$(".chat-place-group-message").addClass('none');
				$(".chat-place-dm-message").removeClass('none');
				$(".icon-1-desktop").removeClass("active");
				$(".icon-2-desktop").removeClass("active");
				$(".icon-3-desktop").addClass("active");
				$(".icon-4-desktop").removeClass("active");
			});
			$(".mobile-menu-icon-1").click(function() {
				$(".icon-1").addClass("active");
				$(".icon-2").removeClass("active");
				$(".icon-3").removeClass("active");
				$(".icon-4").removeClass("active");
				$(".icon-5").removeClass("active");
				$(".mobile-bottom-message").removeClass("none");
				$(".mobile-bottom-group-message").addClass("none");
				$(".mobile-bottom-dm").addClass("none");
				$(".mobile-bottom-notif").addClass("none");
				$(".mobile-bottom-setting").addClass("none");
			});
			$(".mobile-menu-icon-2").click(function() {
				$(".icon-1").removeClass("active");
				$(".icon-2").addClass("active");
				$(".icon-3").removeClass("active");
				$(".icon-4").removeClass("active");
				$(".icon-5").removeClass("active");
				$(".mobile-bottom-message").addClass("none");
				$(".mobile-bottom-group-message").removeClass("none");
				$(".mobile-bottom-dm").addClass("none");
				$(".mobile-bottom-notif").addClass("none");
				$(".mobile-bottom-setting").addClass("none");
			});
			$(".mobile-menu-icon-3").click(function() {
				$(".icon-1").removeClass("active");
				$(".icon-2").removeClass("active");
				$(".icon-3").addClass("active");
				$(".icon-4").removeClass("active");
				$(".icon-5").removeClass("active");
				$(".mobile-bottom-message").addClass("none");
				$(".mobile-bottom-group-message").addClass("none");
				$(".mobile-bottom-dm").removeClass("none");
				$(".mobile-bottom-notif").addClass("none");
				$(".mobile-bottom-setting").addClass("none");
			});
			$(".mobile-menu-icon-4").click(function() {
				$(".icon-1").removeClass("active");
				$(".icon-2").removeClass("active");
				$(".icon-3").removeClass("active");
				$(".icon-4").addClass("active");
				$(".icon-5").removeClass("active");
				$(".mobile-bottom-message").addClass("none");
				$(".mobile-bottom-group-message").addClass("none");
				$(".mobile-bottom-dm").addClass("none");
				$(".mobile-bottom-notif").removeClass("none");
				$(".mobile-bottom-setting").addClass("none");
			});
			$(".mobile-menu-icon-5").click(function() {
				$(".icon-1").removeClass("active");
				$(".icon-2").removeClass("active");
				$(".icon-3").removeClass("active");
				$(".icon-4").removeClass("active");
				$(".icon-5").addClass("active");
				$(".mobile-bottom-message").addClass("none");
				$(".mobile-bottom-group-message").addClass("none");
				$(".mobile-bottom-dm").addClass("none");
				$(".mobile-bottom-notif").addClass("none");
				$(".mobile-bottom-setting").removeClass("none");
			});
			$(".fileClicker").click(function() {
				$("#getFile").click();
			});
		})
	}
	
	formatTime(date)
	{
		var hours = date.getHours();
		var minutes = date.getMinutes();

		minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
		hours = hours < 10 ? '0' + hours.toString() : hours.toString();
		return (hours + ':' + minutes);
	}

	onMessageRecieved(fullname, messages, avatar, time, channel)
	{
		if (channel.name === this.channel)
		{
			this.addMessage(messages, avatar, fullname, this.formatTime(new Date(time)));
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

	addMessage(msg, pp, fullname, time, username)
	{
		if (msg)
		{
			var messages = this.state.messages;
			if (username == this.state.userinfo.username)
			{
				messages.push(<MessageTemplateLeft time={time} fullname={fullname} content={msg} profilephoto={pp} key={messages.length}/> );
			}
			else
			{	
				messages.push(<MessageTemplateRight time={time} fullname={fullname} content={msg} profilephoto={pp} key={messages.length}/> );
			}
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
			<div className="w-full h-screen">
				<div className="main w-full h-screen none sm:flex justifty-start none sm:visible">
					<div className="left-bar w-24 h-full mobile hybrid bg-blue-900 relative">
						<div className="menu w-full h-11-12 mobile hybrid bg-darkblue">
							<div className="menu-icon w-full h-1/6 flex">
								<div className="m-auto">
									<svg className="w-10 h-10 fill-white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
										<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
									</svg>
									<span className="text-center text-white font-bold text-xl">Chat</span>
								</div>
							</div>
							<div className="menu-icon w-full h-1/6 flex mobile hybrid">
								<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faBookmark} />
							</div>
							<div className="menu-icon w-full h-1/6 flex mobile hybrid">
								<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faQuestion} />
							</div>
							<div className="menu-icon w-full h-1/6 flex mobile hybrid">
								<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faQuestion} />
							</div>
							<div className="menu-icon w-full h-1/6 flex mobile hybrid">
								<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faQuestion} />
							</div>
							<div className="menu-icon w-full h-1/6 flex mobile hybrid">
								<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faQuestion} />
							</div>
						</div>
						<div className="settings w-full h-1-12 mobile hybrid bg-darkblue flex">
							<FontAwesomeIcon className="z-10 w-10 h-10 m-auto text-blue-800 hover:cursor-pointer hover:text-blue-400" icon={faGear} />
						</div>
						<ul className="circles">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>
					<div className="chat-side h-full w-2/6 resizeble mobile hybrid bg-darkblue-lower1">
						<div className="search-bar w-full h-1-12 flex mobile hybrid">
							<input type="text" placeholder="&#xF002; Search" className="w-full h-full bg-darkblue-lower1 text-white border-b-2 pl-6" />
						</div>
						<div className="chat-place w-full h-10-12 mobile hybrid overflow-y-scroll no-scrollbar">
							<div className="chat-place-message w-full h-full">
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto">Message Owner Name</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="chat-place-group-message w-full h-full none">
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && Message Owner 2</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="chat-place-dm-message w-full h-full none">
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
								<div className="short-chat w-full h-1/6 mobile hybrid border-b-2 border-blue-800 hover:border-blue-400 flex justifty-start">
									<div className="message-logo w-3/12 h-full mobile hybrid my-auto flex">
										<img src="https://dummyimage.com/110x110" alt="" className="m-auto rounded-full xl:w-20 xl:h-20 2xl:w-100px 2xl:h-100px" />
									</div>
									<div className="message-info w-8/12 h-full mobile hybrid">
										<div className="message-owner w-full h-2/5 mobile hybrid flex">
											<span className="text-white text-xl pl-6 my-auto truncate">Message Owner Name && DM</span>
										</div>
										<div className="this-message w-full h-3/5 mobile hybrid overflow-hidden flex">
											<p className="pl-6 text-white font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eaque.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="chat-side-menu w-full h-1-12 flex mobile hybrid">
							<div className="menu-1 w-1/4 h-full mobile hybrid flex">
								<FontAwesomeIcon className="icon-1-desktop m-auto text-blue-800 hover:text-blue-400 w-10 h-10 hover:cursor-pointer channel-message" icon={faMessage} />
							</div>
							<div className="menu-2 w-1/4 h-full mobile hybrid flex">
								<FontAwesomeIcon className="icon-2-desktop m-auto text-blue-800 hover:text-blue-400 w-10 h-10 hover:cursor-pointer group-message" icon={faUserGroup} />
							</div>
							<div className="menu-3 w-1/4 h-full mobile hybrid flex">
								<FontAwesomeIcon className="icon-3-desktop m-auto text-blue-800 hover:text-blue-400 w-10 h-10 hover:cursor-pointer dm-message" icon={faLock} />
							</div>
							<div className="menu-4 w-1/4 h-full mobile hybrid flex">
								<FontAwesomeIcon className="icon-4-desktop m-auto text-blue-800 hover:text-blue-400 w-10 h-10 hover:cursor-pointer notifi-place" icon={faBell} />
							</div>
						</div>
					</div>
					<div className="message-side h-full w-4/6 border-l-2 border-blue-800 mobile hybrid bg-darkblue-lower1">
						<div className="message-side-top w-full h-1-12 mobile hybrid border-b-2 border-blue-800 flex">
							<div className="left w-1/12 h-full flex mobile hybrid">
								<img src="https://dummyimage.com/50x50" alt="" className="m-auto rounded-full" />
							</div>
							<div className="middle w-10/12 h-full flex mobile hybrid">
								<span className="m-auto text-2xl text-white">Group Name [Online Count = 31]</span>
							</div>
							<div className="right w-1/12 h-full flex mobile hybrid">
								<i className="fa-solid fa-plus text-white w-10 h-10 m-auto hover:cursor-pointer"></i>
							</div>
						</div>
						<div className="message-middle-side w-full h-10-12 mobile hybrid overflow-y-scroll no-scrollbar pt-2">
							{this.state.messages}
							<div className="clear"></div>
						</div>
						<div className="message-bottom-side w-full h-1-12 border-t-2 border-blue-800 flex">
							<div className="left w-1/12 h-full mobile hybrid flex">
								<input type='file' id="getFile" style={{ display: "none" }} />
								<button className="w-10 h-10 m-auto fileClicker">
									<FontAwesomeIcon className="w-10 h-10 text-blue-800 hover:text-blue-400 m-auto" icon={faCirclePlus} />
								</button>
							</div>
							<div className="middle w-9/12 h-full mobile hybrid border-r-2 border-blue-800">
								<input onKeyPress={(e) => this.keyPressedHandler(e)} type="text" className="w-full h-full bg-darkblue-lower1 text-white" placeholder=" Message Here" />
							</div>
							<div className="right w-2/12  h-full mobile hybrid flex">
								<div className="emoji w-1/2 h-full flex">
									<FontAwesomeIcon className="w-10 h-10 text-blue-800 hover:text-blue-400 m-auto" icon={faFaceGrin} />
								</div>
								<div className="send-message w-1/2 h-full mobile hybrid flex">
									<FontAwesomeIcon className="w-10 h-10 text-blue-800 hover:text-blue-400 m-auto" icon={faArrowRight} />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile */}

				<div class="mobile-main visible sm:none w-full h-screen bg-darkblue-lower1">

					<div class="mobile-top w-full h-2/5 flex border-b-2 relative">
						<div class="logo absolute top-0 left-0 w-20 h-20 flex">
							<svg class="w-10 h-10 fill-white my-auto" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
								<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
							</svg>
							<span class="text-white my-auto font-bold">Chat</span>
						</div>
						<div class="mobile-pp m-auto flex">
							<img src="https://dummyimage.com/200x200" alt="" class="mobile-pp m-auto absolute rounded-full border-2" />
						</div>
						<div class="user-info w-full h-10 absolute bottom-0 flex">
							<span class="user-name m-auto text-white">Selim Talha Aksoy | Admin , Student</span>
						</div>
					</div>
					<div class="mobile-bottom w-full h-3/5 relative">
						<div class="mobile-bottom-place absolute w-full h-full top-0 left-0 z-10">
							<div class="mobile-menu w-full h-1/5">
								<div class="mobile-menu-top w-full h-full flex">
									<div class="mobile-menu-icon-1 w-1/5 h-full flex">
										<FontAwesomeIcon className="icon-1 m-auto text-blue-800 w-10 h-10" icon={faMessage} />
									</div>
									<div class="mobile-menu-icon-2 w-1/5 h-full flex ">
										<FontAwesomeIcon className="icon-2 m-auto text-blue-800 w-10 h-10" icon={faUserGroup} />
									</div>
									<div class="mobile-menu-icon-3 w-1/5 h-full flex">
										<FontAwesomeIcon className="icon-3 m-auto text-blue-800 w-10 h-10" icon={faLock} />
									</div>
									<div class="mobile-menu-icon-4 w-1/5 h-full flex">
										<FontAwesomeIcon className="icon-4 m-auto text-blue-800 w-10 h-10" icon={faBell} />
									</div>
									<div class="mobile-menu-icon-5 w-1/5 h-full flex">
										<FontAwesomeIcon className="icon-5 icon-5 z-10 w-10 h-10 m-auto text-blue-800" icon={faGear} />
									</div>
								</div>
								<div class="mobile-menu-border-b w-4/5 mx-auto h-1 border-b-2"></div>
							</div>
							<div class="mobile-bottom w-full h-4/5 overflow-y-scroll no-scrollbar">
								<div class="mobile-bottom-message w-full h-full pt-2 none">
									<div class="mobile-message-short w-full h-1/4 flex border-b-2 mb-2">
										<div class="mobile-message-owner-pp w-1/4 h-full mb-2 flex">
											<img src="https://dummyimage.com/200x200" alt="" class="m-auto mobile-mini-pp w-14 h-14 rounded-full" />
										</div>
										<div class="mobile-message-info w-3/4 h-full">
											<div class="mobile-message-owner w-full h-1/3 pl-2	 flex">
												<span class="my-auto text-white">Talha Aksoy</span>
											</div>
											<div class="mobile-message-short-info w-full h-2/3	pl-2 flex">
												<p class="truncate my-auto text-white"> asdsadsadsadsa sad asdsad as dasd asdsadasd as d asdasdsad asd sad sa dsad sad</p>
											</div>
										</div>
									</div>
									<div class="mobile-message-short w-full h-1/4 flex border-b-2 mb-2">
										<div class="mobile-message-owner-pp w-1/4 h-full mb-2 flex">
											<img src="https://dummyimage.com/200x200" alt="" class="m-auto mobile-mini-pp w-14 h-14 rounded-full" />
										</div>
										<div class="mobile-message-info w-3/4 h-full">
											<div class="mobile-message-owner w-full h-1/3 pl-2	 flex">
												<span class="my-auto text-white">Talha Aksoy</span>
											</div>
											<div class="mobile-message-short-info w-full h-2/3	pl-2 flex">
												<p class="truncate my-auto text-white"> asdsadsadsadsa sad asdsad as dasd asdsadasd as d asdasdsad asd sad sa dsad sad</p>
											</div>
										</div>
									</div>
								</div>
								<div class="mobile-bottom-group-message w-full h-full pt-2 none">
									<div class="mobile-message-short w-full h-1/4 flex border-b-2 mb-2">
										<div class="mobile-message-owner-pp w-1/4 h-full mb-2 flex">
											<img src="https://dummyimage.com/200x200" alt="" class="m-auto mobile-mini-pp w-14 h-14 rounded-full" />
										</div>
										<div class="mobile-message-info w-3/4 h-full">
											<div class="mobile-message-owner w-full h-1/3 pl-2	 flex">
												<span class="my-auto text-white">Chat42 Group</span>
											</div>
											<div class="mobile-message-short-info w-full h-2/3	pl-2 flex">
												<p class="truncate my-auto text-white"> asdsadsadsadsa sad asdsad as dasd asdsadasd as d asdasdsad asd sad sa dsad sad</p>
											</div>
										</div>
									</div>
								</div>
								<div class="mobile-bottom-dm w-full h-full pt-2 none">
									<div class="mobile-message-short w-full h-1/4 flex border-b-2 mb-2">
										<div class="mobile-message-owner-pp w-1/4 h-full mb-2 flex">
											<img src="https://dummyimage.com/200x200" alt="" class="m-auto mobile-mini-pp w-14 h-14 rounded-full" />
										</div>
										<div class="mobile-message-info w-3/4 h-full">
											<div class="mobile-message-owner w-full h-1/3 pl-2	 flex">
												<span class="my-auto text-white">Chat42 DM</span>
											</div>
											<div class="mobile-message-short-info w-full h-2/3	pl-2 flex">
												<p class="truncate my-auto text-white"> asdsadsadsadsa sad asdsad as dasd asdsadasd as d asdasdsad asd sad sa dsad sad</p>
											</div>
										</div>
									</div>
								</div>
								<div class="mobile-bottom-notif w-full h-full pt-2 none">
									<div class="mobile-message-notif w-full h-1/4 border-b-2 mb-2 break-word overflow-hidden pt-2 pl-4 pr-4">
										<span class="bg-purple-400 bg-opacity-50">@42User Senden Bahsetti</span>
										<p class="truncate">asdasdsadasdasdasdsadasdsadasdasdasdasdasdasdasdasdsadasdasdasdasasdasdasdasdsadsaddasdasdasdasdasdasdasdasdasdasdasdasdasdas</p>
									</div>
									<div class="mobile-message-notif w-full h-1/4 border-b-2 mb-2 break-word overflow-hidden pt-2 pl-4 pr-4">
										<span class="bg-purple-400 bg-opacity-50">@42User Senden Bahsetti</span>
										<p class="truncate">asdasdsadasdasdasdsadasdsadasdasdasdasdasdasdasdasdsadasdasdasdasasdasdasdasdsadsaddasdasdasdasdasdasdasdasdasdasdasdasdasdas</p>
									</div>
								</div>
								<div class="mobile-bottom-setting w-full h-full pt-2 none">
									<div class="settings-1 w-full h-1/4 border-b-2 flex mb-2">
										<div class="dark-mode m-auto">
											Dark Mode : On <input type="radio" name="dark" id="" /> | Off <input type="radio" name="dark" id="" />
										</div>
									</div>
									<div class="settings-1 w-full h-1/4 border-b-2 flex mb-2">
										<div class="dark-mode m-auto">
											Power Saver : On <input type="radio" name="dark" id="" /> | Off <input type="radio" name="dark" id="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mobile-bottom-animation-area absolute top-0 left-0 w-full h-full z-0">
							<ul class="circles-mobile">
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}