import React from "react";
import "./Form.css";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: ""
		}
	}
	
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}
	
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}
	
	onSubmitSignIn = () => {
		fetch("https://safe-basin-84320.herokuapp.com/signin", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
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
		const { onRouteChange } = this.props;
		return(
			<div className="App-center">
				<div className="form--main">
					<h2 className="form--header">Sign In</h2>
					<label htmlFor="username">Email</label>
					<input onChange={this.onEmailChange}className="form--username" type="text"/>
					<label htmlFor="username">Password</label>
					<input onChange={this.onPasswordChange}className="form--password" type="password" />
					<button className="form--submit" onClick={this.onSubmitSignIn}>Sign In</button>
					<p className="form--register" onClick={() => onRouteChange("register")}>Register</p>
				</div>
			</div>
		);
	}
}

export default Signin;