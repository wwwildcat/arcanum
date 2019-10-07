import React from 'react';
import {Link} from 'react-router-dom';
import {cnBreadCrumbs} from '../BreadCrumbs';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextLineHeight24 from '../../Text/_lineHeight/Text_lineHeight_24';
import BreadCrumbsItemActive from './_active/BreadCrumbs-Item_active';
import './BreadCrumbs-Item.css';
import {connect} from 'react-redux';
import {goToDirectory} from '../../../server/redux/actions';
import {getDirectoryContent} from '../../../server/redux/middleware';

function mapStateToProps(state) {
	return {
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onObjectNameClick: (value, repo, path) => {
			dispatch(goToDirectory(value));
			dispatch(getDirectoryContent(repo, path));
		}
	};
}

function BreadCrumbsItem({number, itemName, onObjectNameClick, isBreadCrumbsItemActive, currentRepository, pathToObject}) {
	if (isBreadCrumbsItemActive) {
		return (
			<li className={BreadCrumbsItemActive}>
				<span className={TextStyleBold + ' ' + TextLineHeight24}>{itemName}</span>
			</li>
		);
	}
	else {
		const newPath = pathToObject.slice(0, number);
		const fullPath = newPath.length ? '/' + currentRepository + '/tree/master/' + newPath : '/' + currentRepository;
		return (
			<li className={cnBreadCrumbs('Item')} onClick={() => onObjectNameClick(itemName, currentRepository, newPath)}>
				<Link to={fullPath}>
					<span className={TextColorGray2 + ' ' + TextLineHeight24}>{itemName}</span>
				</Link>
			</li>
		);
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbsItem);