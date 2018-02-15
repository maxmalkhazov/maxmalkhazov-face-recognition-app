import React from "react";
import "./Modal.css";
import FaClose from "react-icons/lib/fa/close";
import FaGithub from "react-icons/lib/fa/github";

const Modal = ({isModalOpen, closeModal}) => {
	return(
		<div className="modal--main">
			<p className="modal--btn" onClick={closeModal}><FaClose /></p>
			<p className="modal--text">Maxim Malkhazov &copy;2018</p>
			<a className="modal--github" href="https://github.com/maxmalkhazov" target="_blank"><FaGithub /></a>
		</div>
	);
}



export default Modal;