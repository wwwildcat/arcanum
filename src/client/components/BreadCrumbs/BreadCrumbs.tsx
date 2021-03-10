import React from 'react';
import {cn} from '@bem-react/classname';
import BreadCrumbsItem from './-Item/BreadCrumbs-Item';
import './BreadCrumbs.css';
import State from '../../store/types';
import {connect} from 'react-redux';

export const cnBreadCrumbs = cn('BreadCrumbs');

interface Props {
	currentRepo: string;
	currentPath: string;
}

const mapStateToProps = (state: State) => ({
		currentRepo: state.currentRepo,
		currentPath: state.currentPath
	});

const BreadCrumbs = ({currentRepo, currentPath}: Props) => {
		const breadCrumbsItems = currentPath ? [currentRepo].concat(currentPath.split('/')) : [currentRepo];
		return (
			<ul className={cnBreadCrumbs()}>
				{breadCrumbsItems.map((item, number) => {
					const isActive = (number === breadCrumbsItems.length - 1);
					return (
						<BreadCrumbsItem key={number} number={number} itemName={isActive ? item : item + ' / '} isBreadCrumbsItemActive={isActive} />
					);
				})}
			</ul>
		);	
}

export default connect(mapStateToProps)(BreadCrumbs);