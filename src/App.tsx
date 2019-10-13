import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Files from './client/components/Files/Files';
import {NotFound} from './client/components/NotFound/NotFound';
import Header from './client/components/Header/Header';
import {Footer} from './client/components/Footer/Footer';
import './App.css';

export const App = () =>
		<>
			<Header />
			<Switch>
				<Route exact path='/:repositoryID' component={Files} />
				<Route exact path='/:repositoryID/tree/master/:path([^/]*)?' component={Files} />
				<Route exact path='/:repositoryID/blob/master/:path([^/]*)?' component={Files} />
				<Route component={NotFound} />
			</Switch>
			<Footer />
		</>