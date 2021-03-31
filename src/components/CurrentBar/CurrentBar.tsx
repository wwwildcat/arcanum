import React from 'react';
import { useSelector } from 'react-redux';
import { getBlobData, getCurrentInfo, getTreeData } from '@/store/selectors';
import { ObjectData } from '@/store/types';
import BranchList from '../BranchList/BranchList';
import './CurrentBar.scss';

interface Props {
    isBranches: boolean;
    type: 'tree' | 'blob';
}

const getLastCommit = (data: ObjectData[]) =>
    [...data].sort((a, b) => Number(new Date(b.absDate)) - Number(new Date(a.absDate)))[0];

const CurrentBar = ({ isBranches, type }: Props) => {
    const treeData = useSelector(getTreeData);
    const blobData = useSelector(getBlobData);
    const { repo, branch, path } = useSelector(getCurrentInfo);
    const name = path.length ? path[path.length - 1] : repo;
    const { hash, commiter, absDate } = type === 'blob' ? blobData : getLastCommit(treeData) ?? {};

    return (
        <div className="CurrentBar" data-testid="currentBar">
            <div className="CurrentBar-Name">{name}</div>
            {!isBranches && (
                <>
                    <BranchList type={type} />
                    {branch && (
                        <div className="CurrentBar-LastCommit" data-testid="currentBar-lastCommit">
                            Last commit
                            <span className="CurrentBar-LastCommit_style_blue"> {hash}</span> on
                            <span className="CurrentBar-LastCommit_style_blue"> {absDate}</span> by
                            <div className="CurrentBar-LastCommit_style_commiter">{commiter}</div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CurrentBar;
