import React from 'react';
import {cn} from '@bem-react/classname';
import BreadCrumbsItem from './-Item/BreadCrumbs-Item';
import './BreadCrumbs.css';
import State from '../../store/state';
import {connect} from 'react-redux';

export const cnBreadCrumbs = cn('BreadCrumbs');

interface Props {
	currentRepository: string;
	pathToObject: string;
}

const mapStateToProps = (state: State) => ({
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject
	});

const BreadCrumbs = ({currentRepository, pathToObject}: Props) => {
		const breadCrumbsItems = pathToObject ? [currentRepository].concat(pathToObject.split('/')) : [currentRepository];
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