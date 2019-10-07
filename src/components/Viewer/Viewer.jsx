import React from 'react';
import {cn} from '@bem-react/classname';
import ViewerHeader from './-Header/Viewer-Header';
import ViewerContent from './-Content/Viewer-Content';
import './Viewer.css';

export const cnViewer = cn('Viewer');

function Viewer() {
	return (
		<div className={cnViewer()}>
			<ViewerHeader />
			<ViewerContent />
		</div>
	);
}

export default Viewer;