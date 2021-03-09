import React from 'react';
import ViewerLineNumberFile from './_file/Viewer-LineNumber_file';
import './Viewer-LineNumber.css';

interface Props {
	value: number;
}

export const ViewerLineNumber = ({value}: Props) => {
		return (
			<div className={ViewerLineNumberFile}>{value}</div>
		);
}