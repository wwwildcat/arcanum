import React from 'react';
import {Link} from 'react-router-dom';
import {cnBreadCrumbs} from '../BreadCrumbs';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextLineHeight24 from '../../Text/_lineHeight/Text_lineHeight_24';
import BreadCrumbsItemActive from './_active/BreadCrumbs-Item_active';
import State from '../../../store/state';
import './BreadCrumbs-Item.css';
import {connect} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {goToObject} from '../../../store/actions';
import {getDirectoryContent} from '../../../store/middleware';

interface Props {
	currentRepository: string;
	pathToObject: string;
	isBreadCrumbsItemActive: Boolean;
	number: number;
	itemName: string;
	onObjectNameClick: (value: string, repo: string, path: string) => void;
}

const mapStateToProps = (state: State) => ({
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject
	});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
		onObjectNameClick: (value: string, repo: string, path: string) => {
			dispatch(goToObject(value));
			dispatch(getDirectoryContent(repo, path));
		}
	});

const BreadCrumbsItem = ({currentRepository, pathToObject, isBreadCrumbsItemActive, number, itemName, onObjectNameClick}: Props) => {
		if (isBreadCrumbsItemActive) {
			return (
				<li className={BreadCrumbsItemActive}>
					<span className={TextStyleBold + ' ' + TextLineHeight24}>{itemName}</span>
				</li>
			);
		}
		else {
			const appayPath = pathToObject.split('/');
			const newPath = appayPath.slice(0, number);
			const fullPath = newPath.length ? '/' + currentRepository + '/tree/master/' + newPath.join('/') : '/' + currentRepository;
			return (
				<li className={cnBreadCrumbs('Item')} onClick={() => onObjectNameClick(itemName.slice(0, itemName.length - 2), currentRepository, newPath.join('/'))}>
					<Link to={fullPath}>
						<span className={TextColorGray2 + ' ' + TextLineHeight24}>{itemName}</span>
					</Link>
				</li>
			);
		} 
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbsItem);