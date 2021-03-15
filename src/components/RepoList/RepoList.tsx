import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import ArrowDown from '../svg/ArrowDown.svg';
import State from '../../store/types';
import './RepoList.scss';

const mapStateToProps = (state: State) => ({
    allRepos: state.allRepos,
    currentRepo: state.currentRepo,
});

interface Props {
    allRepos: string[];
    currentRepo: string;
}

const RepoList = ({ allRepos, currentRepo }: Props) => (
    <div className="RepoList">
        <span className="RepoList-Current">
            Repository <span className="RepoList-Title">{currentRepo}</span>
        </span>
        <ArrowDown className="RepoList-Arrow" />
        <ul className={cn('RepoList-Dropdown', true && 'RepoList-Dropdown_closed')}>
            {allRepos.map((item, index) => (
                <li className="RepoList-Item" key={index}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default connect(mapStateToProps)(RepoList);
