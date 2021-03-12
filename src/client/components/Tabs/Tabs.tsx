import React from 'react';
import { tabsData } from '../data';
import './Tabs.css';

interface Props {
	type: 'blob' | 'tree';
	activeTab?: 0 | 1;
}

const Tabs = ({ type, activeTab = 0 }: Props) =>
	<ul className="Tabs">
		{tabsData[type].map((item, number) => {
			const isActive = activeTab === number;

			return (
				<li className={`Tabs-Item ${isActive && 'Tabs-Item_active'}`} key={number}>
					{isActive ? item : <a href='#'>{item}</a>}
				</li>)
		})}
	</ul>

export default Tabs