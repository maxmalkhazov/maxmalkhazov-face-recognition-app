import React from "react";
import "./Rank.css";

const Rank = ({name, entries}) => {
	return(
		<div className="rank--main">
			<p className="rank--intro">
				{"This magic Bot will detect faces in your pictures. Give it a try!"}
			</p>
			<div className="rank--text">
				{`${name}, the number of submission you have made so far is...`}
			</div>
			<div className="rank--position">
				{`${entries}`}
			</div>
		</div>
	);
}

export default Rank;
