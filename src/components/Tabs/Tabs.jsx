import React from 'react';
import {cn} from '@bem-react/classname';
import TabsItem from './-Item/Tabs-Item';
import './Tabs.css';

export const cnTabs = cn('Tabs');

function Tabs({isFile, activeTab}) {
	let tab1 = isFile ? 'DETAILS' : 'FILES';
	let tab2 = isFile ? 'HISTORY' : 'BRANCHES';
	let isActive1 = (activeTab === '1') ? true : false;
	let isActive2 = (activeTab === '2') ? true : false;
	return (
		<div className={cnTabs()}>
			<TabsItem tabName={tab1} isActive={isActive1}/>
			<TabsItem tabName={tab2} isActive={isActive2}/>
		</div>
	);
}

Tabs.defaultProps = {
	isFile: false,
	activeTab: '1'
};

export default Tabs;