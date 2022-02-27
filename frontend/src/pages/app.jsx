import { Component } 				from "react"
import { isLogged }					from '../includes/utils';
import Main							from "./main";
import Login						from "./login";

export default class App extends Component
{	
	constructor(props)
	{
		super(props)
		this.state = { page: undefined };
	}

	async componentDidMount()
	{
	/* 	if (await isLogged()) */
			this.setState({
				page: (<Main />)
			});
		/* else
			this.setState({
				page: (<Login />)
			});		 */
	}

	render()
	{
		return (
			<>
			{ this.state.page }
			</>
		);
	}
}