import React from 'react';
import './Repolist-CurrentRepo.css';
import {cnRepoList} from '../RepoList';
import TextLineHeight18 from '../../Text/_lineHeight/Text_lineHeight_18';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import State from '../../../store/types';
import {connect} from 'react-redux';

const mapStateToProps = (state: State) => ({
		currentRepo: state.currentRepo
	});

interface Props {
	currentRepo: string;
}

const RepoListCurrentRepo = ({currentRepo}: Props) => 
			<span className={cnRepoList('CurrentRepo', [TextLineHeight18])}>
				<span className={TextStyleBold + ' ' + TextLineHeight18}>Repository </span> {currentRepo}
			</span>

export default connect(mapStateToProps)(RepoListCurrentRepo);