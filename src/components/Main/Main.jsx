import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Files from '../Files/Files';
import NotFound from '../NotFound/NotFound';

function Main() {
	return (
		<Switch>
			<Route exact path='/:repositoryID' component={Files} />
			<Route exact path='/:repositoryID/tree/master/:path([^/]*)?' component={Files} />
			<Route exact path='/:repositoryID/blob/master/:path([^/]*)?' component={Files} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default Main;