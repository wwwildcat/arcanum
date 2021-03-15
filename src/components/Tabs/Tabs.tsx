import React from 'react';
import { tabsData } from '../data';
import './Tabs.scss';

interface Props {
    type: 'blob' | 'tree';
    activeTab?: 0 | 1;
}

const Tabs = ({ type, activeTab }: Props): JSX.Element => (
    <ul className="Tabs">
        {tabsData[type].map((item, index) => {
            const isActive = activeTab === index;

            return (
                <li className={`Tabs-Item ${isActive && 'Tabs-Item_active'}`} key={index}>
                    {isActive ? item : <span>{item}</span>}
                </li>
            );
        })}
    </ul>
);

Tabs.defaultProps = {
    activeTab: 0,
};

export default Tabs;
