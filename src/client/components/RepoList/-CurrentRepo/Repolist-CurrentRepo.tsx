import React from 'react';
import './Repolist-CurrentRepo.css';
import {cnRepoList} from '../RepoList';
import TextLineHeight18 from '../../Text/_lineHeight/Text_lineHeight_18';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import State from '../../../store/state';
import {connect} from 'react-redux';

const mapStateToProps = (state: State) => ({
		currentRepository: state.currentRepository
	});

interface Props {
	currentRepository: string;
}

const RepoListCurrentRepo = ({currentRepository}: Props) => 
			<span className={cnRepoList('CurrentRepo', [TextLineHeight18])}>
				<span className={TextStyleBold + ' ' + TextLineHeight18}>Repository </span> {currentRepository}
			</span>

export default connect(mapStateToProps)(RepoListCurrentRepo);