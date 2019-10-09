import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Files from './components/Files/Files';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';


class App extends React.Component {

	render() {
		return (
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
		);
	}
}

export default App;
