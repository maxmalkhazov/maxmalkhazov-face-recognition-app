import React from "react";
import "./Navigation.css";

const Navigation = ({onRouteChange, isSignedIn, name}) => {
	if (isSignedIn) {
		return(
			<nav>
				<p>{`Hello, ${name}!`}</p>
				<p className="nav--sign-out" onClick={() => onRouteChange("signout")}>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav>
				<p className="nav--sign-out" onClick={() => onRouteChange("signin")}>Sign In</p>
				<p className="nav--sign-out" onClick={() => onRouteChange("register")}>Register</p>
			</nav>
		);
	}
}

export default Navigation;