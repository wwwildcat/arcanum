import React from 'react';
import './Icon_type_arrowUpBlack.css';
import cnIcon from '../Icon';

function ArrowUpBlack () {
	return (
		<svg className={cnIcon({type: 'arrowUpBlack'})} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.464844 6.76562L0.947266 7.27344C1.07422 7.375 1.27734 7.375 1.37891 7.27344L6 2.67773L10.5957 7.27344C10.6973 7.375 10.9004 7.375 11.0273 7.27344L11.5098 6.76562C11.6367 6.63867 11.6367 6.46094 11.5098 6.33398L6.20312 1.00195C6.07617 0.900391 5.89844 0.900391 5.77148 1.00195L0.464844 6.33398C0.337891 6.46094 0.337891 6.63867 0.464844 6.76562Z" fill="black"/>
		</svg>
	);
}

export default ArrowUpBlack;