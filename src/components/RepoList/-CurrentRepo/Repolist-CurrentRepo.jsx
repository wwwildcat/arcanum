import React from 'react';
import './Repolist-CurrentRepo.css';
import {cnRepoList} from '../RepoList';
import TextLineHeight18 from '../../Text/_lineHeight/Text_lineHeight_18.jsx';
import TextStyleBold from '../../Text/_style/Text_style_bold.jsx';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		currentRepository: state.currentRepository
	};
}

function RepoListCurrentRepo ({currentRepository}) {
	return (
		<span className={cnRepoList('CurrentRepo', [TextLineHeight18])}>
			<span className={TextStyleBold + ' ' + TextLineHeight18}>Repository </span> {currentRepository}
		</span>
	);
}

RepoListCurrentRepo.defaultProps = {
	currentRepository: 'Arc'
};

export default connect(mapStateToProps)(RepoListCurrentRepo);