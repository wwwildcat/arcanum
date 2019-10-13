import {cn} from '@bem-react/classname';
import './Tabs-Item_active.css';

const cnTabs = cn('Tabs');
const TabsItemActive = cnTabs('Item', {active: true});
export default TabsItemActive;