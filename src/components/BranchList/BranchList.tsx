import React from 'react';
import cn from 'classnames';
import ArrowDown from '../svg/ArrowDown.svg';
import './BranchList.scss';

interface Props {
    currentBranch?: string;
    list?: {
        branch: string;
        date: string;
    }[];
}

const BranchList = ({ currentBranch, list }: Props): JSX.Element => (
    <div className="BranchList">
        <span className="BranchList-CurrentBranch">{currentBranch}</span>
        <ArrowDown className="BranchList-Arrow" />
        <ul className={cn('BranchList-Dropdown', true && 'BranchList-Dropdown_closed')}>
            {list.map(({ branch, date }, index) => {
                const isSelected = branch === currentBranch;

                return (
                    <React.Fragment key={index}>
                        <li
                            className={cn(
                                'BranchList-Item',
                                isSelected && 'BranchList-Item_selected'
                            )}
                        >
                            {branch}
                            <div
                                className={cn(
                                    'BranchList-LastCommit',
                                    isSelected && 'BranchList-LastCommit_selected'
                                )}
                            >
                                Last commit: {date}
                            </div>
                        </li>
                        {isSelected && <hr className="BranchList-Break" />}
                    </React.Fragment>
                );
            })}
        </ul>
    </div>
);

BranchList.defaultProps = {
    currentBranch: 'master',
    list: [
        {
            branch: 'master',
            date: '4 s ago',
        },
        {
            branch: 'users/rudskoy/DEVTOOLS-43865',
            date: '1 min ago',
        },
        {
            branch: 'users/rudskoy/DEVTOOLS-37948',
            date: '16:25',
        },
        {
            branch: 'users/rudskoy/DEVTOOLS-94877',
            date: 'yesterday, 14:50',
        },
        {
            branch: 'users/rudskoy/DEVTOOLS-87450',
            date: 'Jan 11, 12:01',
        },
        {
            branch: 'users/rudskoy/DEVTOOLS-27073',
            date: 'Dec 29, 2017',
        },
    ],
};

export default BranchList;
