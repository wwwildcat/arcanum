import React from 'react';
import {cn} from '@bem-react/classname';
import TabsItem from './-Item/Tabs-Item';
import './Tabs.css';

export const cnTabs = cn('Tabs');

function Tabs({type, activeTab}) {
	let tab1 = type === 'blob' ? 'DETAILS' : 'FILES';
	let tab2 = type === 'blob' ? 'HISTORY' : 'BRANCHES';
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
	type: 'tree',
	activeTab: '1'
};

export default Tabs;