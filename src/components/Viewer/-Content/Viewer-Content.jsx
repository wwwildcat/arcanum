import React from 'react';
import TextStyleCode from '../../Text/_style/Text_style_code';
import Text_color_blue1 from '../../Text/_color/Text_color_blue1';
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
	if (fileContent) {
		return (
			<div className={ViewerContentFile + ' ' + TextStyleCode + ' ' + Text_color_blue1}>
				{fileContent.map((line, number) => 
					<pre key={number}>
						<ViewerLineNumber value={number + 1} />
						<span>{line}</span>
					</pre>)}
			</div>
		);
	}
	else return (
		<div className={ViewerContentFile + ' ' + TextStyleCode + ' ' + Text_color_blue1}></div>
	);
}

export default connect(mapStateToProps)(ViewerContent);