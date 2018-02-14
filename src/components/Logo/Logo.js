import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logobot from "./icons8-bot-96.png";

const Logo = () => {
	return(
		<div className="logo--main">
			<Tilt className="Tilt logo" options={{ max : 55 }} style={{ height: 200, width: 200 }} >
				<div className="Tilt-inner logo--inner"><img className="logobot" src={logobot} alt="Logo"/></div>
			</Tilt>
		</div>
	);
}

export default Logo;