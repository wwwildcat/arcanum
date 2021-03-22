import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { tabsData } from '../data';
import State from '../../store/types';
import './Tabs.scss';

interface Props {
    activeTab: number;
    branch: string;
    isRoot: boolean;
    path: string[];
    repo: string;
    type: 'tree' | 'blob';
}

const mapStateToProps = (state: State) => ({
    repo: state.currentRepo,
    branch: state.currentBranch,
    path: state.currentPath,
});

const Tabs = ({ activeTab, branch, isRoot, path, repo, type }: Props) => {
    const currentTabs = type === 'blob' ? tabsData.slice(2).reverse() : tabsData.slice(0, 3);

    return (
        <ul className="Tabs">
            {currentTabs.map(({ name, url }, index) => {
                const isActive = activeTab === index;

                return (
                    (isRoot || name !== 'BRANCHES') && (
                        <li className={`Tabs-Item ${isActive && 'Tabs-Item_active'}`} key={index}>
                            {isActive ? name : <Link href={url(repo, branch, path)}>{name}</Link>}
                        </li>
                    )
                );
            })}
        </ul>
    );
};

export default connect(mapStateToProps)(Tabs);
