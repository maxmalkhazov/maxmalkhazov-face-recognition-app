import React from "react";
import "../Signin/Form.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: ""
		}
	}
	
	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}
	
	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}
	
	onSubmitSignIn = () => {
		fetch("https://safe-basin-84320.herokuapp.com/register", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange("home");
			}
		})
	}
	
	render() {
		return(
			<div className="App-center">
				<div className="form--main">
					<h2 className="form--header">Register</h2>
					<label htmlFor="name">Name</label>
					<input onChange={this.onNameChange} className="form--username" type="text"/>
					<label htmlFor="email">Email</label>
					<input onChange={this.onEmailChange} className="form--email" type="email"/>
					<label htmlFor="password">Password</label>
					<input onChange={this.onPasswordChange} className="form--password" type="password" />
					<button onClick={this.onSubmitSignIn} className="form--submit">Register</button>
				</div>
			</div>
		);
	}
}

export default Register;