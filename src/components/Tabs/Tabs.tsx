import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getCurrentInfo } from '@/store/selectors';
import { tabsData } from '../data';
import './Tabs.scss';

interface Props {
    activeTab: number;
    type: 'tree' | 'blob';
}

const Tabs = ({ activeTab, type }: Props) => {
    const currentTabs = type === 'blob' ? tabsData.slice(2).reverse() : tabsData.slice(0, 3);
    const { repo, branch, path } = useSelector(getCurrentInfo);

    return (
        <ul className="Tabs">
            {currentTabs.map(({ name, url }, index) => {
                const isActive = activeTab === index;

                return (
                    (!path.length || name !== 'BRANCHES') && (
                        <li className={`Tabs-Item ${isActive && 'Tabs-Item_active'}`} key={index}>
                            {isActive ? name : <Link href={url(repo, branch, path)}>{name}</Link>}
                        </li>
                    )
                );
            })}
        </ul>
    );
};

export default Tabs;
