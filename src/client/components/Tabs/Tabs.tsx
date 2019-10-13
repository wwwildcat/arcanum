import React from 'react';
import {cn} from '@bem-react/classname';
import {TabsItem} from './-Item/Tabs-Item';
import './Tabs.css';

interface Props {
	type: 'blob' | 'tree';
	activeTab?: '1' | '2';
}

export const cnTabs = cn('Tabs');

export const Tabs = ({type, activeTab = '1'}: Props) => {
	const tab1 = (type === 'blob') ? 'DETAILS' : 'FILES';
	const tab2 = (type === 'blob') ? 'HISTORY' : 'BRANCHES';
	const isActive1 = (activeTab === '1') ? true : false;
	const isActive2 = (activeTab === '2') ? true : false;
	return (
		<div className={cnTabs()}>
			<TabsItem tabName={tab1} isActive={isActive1}/>
			<TabsItem tabName={tab2} isActive={isActive2}/>
		</div>
	);
}