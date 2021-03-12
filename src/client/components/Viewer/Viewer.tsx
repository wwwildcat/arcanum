import React from 'react';
import { connect } from 'react-redux';
import State from '../../store/types';
import './Viewer.css';

interface Props {
	fileContent: string[];
}

const mapStateToProps = (state: State) => ({
	fileContent: state.fileContent
});


const Viewer = ({ fileContent }: Props) =>
	<div className="Viewer">
		<div className="Viewer-Header"></div>
		<div className="Viewer-Content">
			{!!fileContent.length && fileContent.map((line, number) =>
				<pre key={number}>
					<div className="Viewer-LineNumber">{number + 1}</div>
					<span>{line}</span>
				</pre>)}
		</div>
	</div>

export default connect(mapStateToProps)(Viewer);