import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';
import { getAllRepos, getCurrentInfo } from '@/store/selectors';
import ArrowDown from '../svg/ArrowDown.svg';
import './RepoList.scss';

const RepoList = () => {
    const repos = useSelector(getAllRepos);
    const { repo: currentRepo } = useSelector(getCurrentInfo);
    const [isOpen, setIsOpen] = useState(!currentRepo);

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
                {repos.map(
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

export default RepoList;
