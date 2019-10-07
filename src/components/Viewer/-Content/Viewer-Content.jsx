import React from 'react';
import TextStyleCode from '../../Text/_style/Text_style_code';
import ViewerContentFile from './_file/Viewer-Content_file';
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
			<pre>{fileContent}</pre>
		</div>
	);
}

export default connect(mapStateToProps)(ViewerContent);