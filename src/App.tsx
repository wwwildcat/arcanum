import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Files from './client/components/Files/Files';
import NotFound from './client/components/NotFound/NotFound';
import Header from './client/components/Header/Header';
import Footer from './client/components/Footer/Footer';
import store from './client/store/createStore';
import './App.css';

const App = () =>
	<Provider store={store}>
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path='/:repoID' component={Files} />
				<Route path='/:repoID/tree/master/:path+' component={Files} />
				<Route path='/:repoID/blob/master/:path+' component={Files} />
				<Route component={NotFound} />
			</Switch>
			<Footer />
		</BrowserRouter>
	</Provider>

export default App;