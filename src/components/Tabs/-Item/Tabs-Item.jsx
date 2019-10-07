import React from 'react';
import {cnTabs} from '../Tabs';
import TabsItemActive from './_active/Tabs-Item_active';
import TextStyleBold from '../../Text/_style/Text_style_bold';
import TextSize16 from '../../Text/_size/Text_size_16';
import TextColorGray2 from '../../Text/_color/Text_color_gray2';
import './Tabs-Item.css';

function TabsItem({isActive, tabName}) {
	if (isActive) {
		return (
			<li className={TabsItemActive}>
				<span className={TextStyleBold + ' ' + TextSize16}>{tabName}</span>
			</li>
		);
	}
	else return (
		<li className={cnTabs('Item')}>
			<a className={TextStyleBold + ' ' + TextSize16 + ' ' + TextColorGray2} href='#'>{tabName}</a>
		</li>
	);
}

export default TabsItem;