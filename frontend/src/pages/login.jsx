import 'bootstrap/dist/css/bootstrap.css';
import { Component }				from 'react';
import { Button, Form, Image, }		from 'react-bootstrap';

export default class Login extends Component
{
	constructor(props)
	{
		super(props);
		this.redirectUrl = "https://api.intra.42.fr/oauth/authorize?client_id=a8c2bf8266a4802fbc28168b2b7b28fa3ff4f753ff22b39b49ad23920618a255&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flu&response_type=code";
	}

	async componentDidMount()
	{
		// Body üzerinde yapılacak stil 
		// değişiklikleri bu şekilde yapılmalı.
		document.body.style.backgroundImage = "url(\"https://signin.intra.42.fr/assets/background_login-a4e0666f73c02f025f590b474b394fd86e1cae20e95261a6e4862c2d0faa1b04.jpg\")";

	}

	render() 
	{
		return (
			<div className="container d-flex justify-content-center align-items-center" style={ {height:"100vh"} }>
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-12 d-flex justify-content-center align-items-center" style={{backgroundColor:"#e9ecef",height:"40vh", borderRadius:"10px"}}> 
					<Form>
						<div className='col-12 mt-3 mb-3 p-0 d-flex justify-content-center'>
							<Image src="/img/logo.gif" className="img-fluid" width={"200px"} />
						</div>
						<div className='col-12'>
							<a href={ this.redirectUrl }>
								<Button variant="primary" style={{borderRadius:"10px"}}>
									Login With Intra (Intra İle Giriş Yap) :D
								</Button>
							</a>
						</div>
					</Form>
					</div>
				</div>
			</div>
		);
	}
}