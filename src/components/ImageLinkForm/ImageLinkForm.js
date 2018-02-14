import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return(
		<div>
			<div className="App-center">
				<div className="form App-center">
					<input className="input--box" type="text" onInput={onInputChange}/>
					<button className="detect--btn" onClick={onButtonSubmit} >Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;