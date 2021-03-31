import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getAllBranches, getCurrentInfo } from '@/store/selectors';
import ArrowDown from '../svg/ArrowDown.svg';
import { cnClosed } from '../utils';
import './BranchList.scss';

interface Props {
    type: 'tree' | 'blob';
}

const BranchList = ({ type }: Props) => {
    const branches = useSelector(getAllBranches);
    const { repo, branch: currentBranch, path } = useSelector(getCurrentInfo);
    const [isOpen, setIsOpen] = useState(!currentBranch);

    return (
        <div className="BranchList" data-testid="branchList">
            <span className="BranchList-CurrentBranch">{currentBranch || 'Select branch'}</span>
            <button
                className={cnClosed('BranchList-Arrow', isOpen)}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <ArrowDown />
            </button>
            <ul className={cnClosed('BranchList-Dropdown', isOpen)}>
                {currentBranch && (
                    <>
                        <li className="BranchList-Item BranchList-Item_selected">
                            {currentBranch}
                            <div className="BranchList-LastCommit BranchList-LastCommit_selected">
                                Last commit{' '}
                                {branches.find(({ name }) => name === currentBranch).date}
                            </div>
                        </li>
                        <hr className="BranchList-Break" />
                    </>
                )}
                {branches.map(
                    ({ name, date }, index) =>
                        name !== currentBranch && (
                            <li className="BranchList-Item" key={index}>
                                <Link href={`/${repo}/${type}/${name}/${path.join('/')}`} passHref>
                                    <a href=" " onClick={() => setIsOpen(false)}>
                                        {name}
                                        <div className="BranchList-LastCommit">
                                            Last commit {date}
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default BranchList;
