/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getAllRepos, getRepo } from '@/store/selectors';
import ArrowDown from '../svg/ArrowDown.svg';
import { cnClosed } from '../utils';
import './RepoList.scss';

interface Props {
    isError: boolean;
}

const RepoList = ({ isError }: Props) => {
    const repos = useSelector(getAllRepos);
    const _currentRepo = useSelector(getRepo);
    const currentRepo = isError ? '' : _currentRepo;
    const [isOpen, setIsOpen] = useState(!currentRepo);

    return (
        <div className="RepoList">
            <span className="RepoList-Current">
                {currentRepo ? 'Repository ' : 'Select repository'}
                <span className="RepoList-Title">{currentRepo}</span>
            </span>
            <button
                className={cnClosed('RepoList-Arrow', isOpen)}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <ArrowDown />
            </button>
            <ul className={cnClosed('RepoList-Dropdown', isOpen)}>
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
                                <Link href={`/${repo}`} passHref>
                                    <a href=" " onClick={() => setIsOpen(false)}>
                                        {repo}
                                    </a>
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default RepoList;
