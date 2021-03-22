import React, { useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';
import ArrowDown from '../svg/ArrowDown.svg';
import State, { BranchData } from '../../store/types';
import './BranchList.scss';

interface Props {
    allBranches: BranchData[];
    currentBranch: string;
    noBranch: boolean;
    repo: string;
    path: string[];
    type: 'tree' | 'blob';
}

const mapStateToProps = (state: State) => ({
    allBranches: state.allBranches,
    repo: state.currentRepo,
    currentBranch: state.currentBranch,
    path: state.currentPath,
});

const BranchList = ({ allBranches, currentBranch, noBranch, repo, path, type }: Props) => {
    const [isOpen, setIsOpen] = useState(noBranch);

    return (
        <div className="BranchList">
            <span className="BranchList-CurrentBranch">{currentBranch}</span>
            <div
                className={cn('BranchList-Arrow', isOpen && 'BranchList-Arrow_open')}
                onClick={() => setIsOpen(!isOpen)}
            >
                <ArrowDown />
            </div>
            <ul className={cn('BranchList-Dropdown', !isOpen && 'BranchList-Dropdown_closed')}>
                {currentBranch && (
                    <>
                        <li className="BranchList-Item BranchList-Item_selected">
                            {currentBranch}
                            <div className="BranchList-LastCommit BranchList-LastCommit_selected">
                                Last commit:{' '}
                                {allBranches?.find((item) => item.name === currentBranch)?.date}
                            </div>
                        </li>
                        <hr className="BranchList-Break" />
                    </>
                )}
                {allBranches.map(
                    ({ name, date }, index) =>
                        name !== currentBranch && (
                            <li className="BranchList-Item" key={index}>
                                <Link href={`/${repo}/${type}/${name}/${path.join('/')}`}>
                                    <div onClick={() => setIsOpen(false)}>
                                        {name}
                                        <div className="BranchList-LastCommit">
                                            Last commit: {date}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default connect(mapStateToProps)(BranchList);
