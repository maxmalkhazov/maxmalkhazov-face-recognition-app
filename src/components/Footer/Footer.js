import React from "react";
import "./Footer.css";
import FaClose from "react-icons/lib/fa/close";
import FaGithub from "react-icons/lib/fa/github";

const Footer = ({isModalOpen, closeModal}) => {
	return(
		<div className="footer--main">
			<p className="modal--btn" onClick={closeModal}><FaClose /></p>
			<p className="footer--text">Maxim Malkhazov &copy;2018</p>
			<a className="footer--github" href="https://github.com/maxmalkhazov" target="_blank"><FaGithub /></a>
		</div>
	);
}



export default Footer;