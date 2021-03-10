import React from 'react';
import {Link} from 'react-router-dom';
import {cnBreadCrumbs} from '../BreadCrumbs';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextLineHeight24 from '../../Text/_lineHeight/Text_lineHeight_24';
import BreadCrumbsItemActive from './_active/BreadCrumbs-Item_active';
import State from '../../../store/types';
import './BreadCrumbs-Item.css';
import {connect} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {setView} from '../../../store/actions';
import {fetchDirContent} from '../../../store/thunks';

interface Props {
	currentRepo: string;
	currentPath: string;
	isBreadCrumbsItemActive: Boolean;
	number: number;
	itemName: string;
	onObjectNameClick: (value: string, repo: string, path: string) => void;
}

const mapStateToProps = (state: State) => ({
		currentRepo: state.currentRepo,
		currentPath: state.currentPath
	});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
		onObjectNameClick: (value: string, repo: string, path: string) => {
			dispatch(setView(value));
			dispatch(fetchDirContent(repo, path));
		}
	});

const BreadCrumbsItem = ({currentRepo, currentPath, isBreadCrumbsItemActive, number, itemName, onObjectNameClick}: Props) => {
		if (isBreadCrumbsItemActive) {
			return (
				<li className={BreadCrumbsItemActive}>
					<span className={TextStyleBold + ' ' + TextLineHeight24}>{itemName}</span>
				</li>
			);
		}
		else {
			const appayPath = currentPath.split('/');
			const newPath = appayPath.slice(0, number);
			const fullPath = newPath.length ? '/' + currentRepo + '/tree/master/' + newPath.join('/') : '/' + currentRepo;
			return (
				<li className={cnBreadCrumbs('Item')} onClick={() => onObjectNameClick(itemName.slice(0, itemName.length - 2), currentRepo, newPath.join('/'))}>
					<Link to={fullPath}>
						<span className={TextColorGray2 + ' ' + TextLineHeight24}>{itemName}</span>
					</Link>
				</li>
			);
		} 
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbsItem);