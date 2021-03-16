import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';
import ArrowDown from '../svg/ArrowDown.svg';
import State from '../../store/types';
import './RepoList.scss';

interface Props {
    allRepos: string[];
    currentRepo: string;
    noRepo: boolean;
}

const mapStateToProps = (state: State) => ({
    allRepos: state.allRepos,
    currentRepo: state.currentRepo,
});

const RepoList = ({ allRepos, currentRepo, noRepo }: Props) => {
    const [isOpen, setIsOpen] = useState(noRepo);

    return (
        <div className="RepoList">
            <span className="RepoList-Current">
                Repository <span className="RepoList-Title">{currentRepo}</span>
            </span>
            <div
                className={cn('RepoList-Arrow', isOpen && 'RepoList-Arrow_open')}
                onClick={() => setIsOpen(!isOpen)}
            >
                <ArrowDown />
            </div>
            <ul className={cn('RepoList-Dropdown', !isOpen && 'RepoList-Dropdown_closed')}>
                {currentRepo && (
                    <>
                        <li className="RepoList-Item RepoList-Item_selected">{currentRepo}</li>
                        <hr className="RepoList-Break" />
                    </>
                )}
                {allRepos.map(
                    (repo, index) =>
                        repo !== currentRepo && (
                            <li className="RepoList-Item" key={index}>
                                <Link href={`/${repo}`}>
                                    <div onClick={() => setIsOpen(false)}>{repo}</div>
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default connect(mapStateToProps)(RepoList);
