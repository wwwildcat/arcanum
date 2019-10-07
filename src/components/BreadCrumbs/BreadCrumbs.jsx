import React from 'react';
import {cn} from '@bem-react/classname';
import BreadCrumbsItem from './-Item/BreadCrumbs-Item';
import './BreadCrumbs.css';
import {connect} from 'react-redux';

export const cnBreadCrumbs = cn('BreadCrumbs');

function mapStateToProps(state) {
	return {
		currentRepository: state.currentRepository,
		pathToObject: state.pathToObject.join('/')
	};
}

class BreadCrumbs extends React.Component {
	render() {
		let breadCrumbsItems = this.props.pathToObject ? [].concat(this.props.currentRepository, this.props.pathToObject.split('/')) : [this.props.currentRepository];
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
	
}

export default connect(mapStateToProps)(BreadCrumbs);