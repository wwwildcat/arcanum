import React from 'react';
import TextStyleCode from '../../Text/_style/Text_style_code';
import ViewerContentFile from './_file/Viewer-Content_file';
import ViewerLineNumber from '../-LineNumber/Viewer-LineNumber';
import './Viewer-Content.css';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		fileContent: state.fileContent
	};
}

function ViewerContent({fileContent}) {
	return (
		<div className={ViewerContentFile + ' ' + TextStyleCode}>
			{fileContent.map((line, number) => 
				<pre>
					<ViewerLineNumber value={number + 1} />
					<span key={number}>{line}</span>
				</pre>)}
		</div>
	);
}

export default connect(mapStateToProps)(ViewerContent);