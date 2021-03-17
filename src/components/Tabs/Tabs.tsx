import React from 'react';
import { tabsData } from '../data';
import './Tabs.scss';

interface Props {
    activeTab?: 0 | 1 | 2;
    isRoot?: boolean;
    type: 'tree' | 'blob';
}

const Tabs = ({ activeTab, isRoot, type }: Props): JSX.Element => {
    const currentTabs = type === 'blob' ? tabsData.slice(2).reverse() : tabsData.slice(0, 3);
    return (
        <ul className="Tabs">
            {currentTabs.map((item, index) => {
                const isActive = activeTab === index;

                return (
                    (isRoot || item !== 'BRANCHES') && (
                        <li className={`Tabs-Item ${isActive && 'Tabs-Item_active'}`} key={index}>
                            {isActive ? item : <span>{item}</span>}
                        </li>
                    )
                );
            })}
        </ul>
    );
};

Tabs.defaultProps = {
    activeTab: 0,
    isRoot: false,
};

export default Tabs;
