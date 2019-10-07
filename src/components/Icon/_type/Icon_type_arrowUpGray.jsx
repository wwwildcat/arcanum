import React from 'react';
import cnIcon from '../Icon';
import './Icon_type_arrowUpGray.css';

function ArrowUpGray () {
	return (
		<svg className={cnIcon({type: 'arrowUpGray'})} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.164062 6.59375L0.683594 7.14062C0.820312 7.25 1.03906 7.25 1.14844 7.14062L6.125 2.19141L11.0742 7.14062C11.1836 7.25 11.4023 7.25 11.5391 7.14062L12.0586 6.59375C12.1953 6.45703 12.1953 6.26562 12.0586 6.12891L6.34375 0.386719C6.20703 0.277344 6.01562 0.277344 5.87891 0.386719L0.164062 6.12891C0.0273438 6.26562 0.0273438 6.45703 0.164062 6.59375Z" fill="#7F8285"/>
		</svg>
	);
}

export default ArrowUpGray;