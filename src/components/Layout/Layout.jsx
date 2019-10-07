import React from 'react';
import {cn} from '@bem-react/classname';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import MainContainer from './-Container/Main-Container';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import './Main.css';

export const cnMain = cn('Main');

function Main() {
	return (
		<main className={cnMain()}>
			<BreadCrumbs />
			<MainContainer />
			<Tabs />
			<Table />
		</main>
	);
}

export default Main;