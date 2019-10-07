import React from 'react';
import ViewerLineNumberFile from './_file/Viewer-LineNumber_file';
import './Viewer-LineNumber.css';


function ViewerLineNumber({value}) {
	return (
		<div className={ViewerLineNumberFile}>{value}</div>
	);
}

export default ViewerLineNumber;