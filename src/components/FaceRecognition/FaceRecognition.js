import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
	const faces = box.map((face, i) => {return <div key={i} className="bounding-box" style={{top: face.topRow, left:face.leftCol, bottom: face.bottomRow, right:face.rightCol}}></div>})
	return(
		<div className="face--box App-center">
			<div className="face--main">
				<img id="inputImage" className="face--image" src={imageUrl} alt=""/>
				{faces}
			</div>
		</div>
	);
}

export default FaceRecognition;