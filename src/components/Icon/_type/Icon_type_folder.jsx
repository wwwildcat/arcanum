import React from 'react';
//import './Icon_type_folder.css';
import cnIcon from '../Icon';

function Folder () {
	return (
		<svg className={cnIcon({type: 'folder'})} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.875 1.5H6.375L4.875 0H1.125C0.492188 0 0 0.515625 0 1.125V7.875C0 8.50781 0.492188 9 1.125 9H10.875C11.4844 9 12 8.50781 12 7.875V2.625C12 2.01562 11.4844 1.5 10.875 1.5Z" fill="black"/>
		</svg>
	);
}

export default Folder;