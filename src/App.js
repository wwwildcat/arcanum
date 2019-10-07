import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import {connect} from 'react-redux';

function mapStateToProps(state) {
	return {
		state: state
	};
}


class App extends React.Component {

	render() {
		if (this.props.state.isLoading) {
			return (<div></div>);
		}
		return (
			<BrowserRouter>
				<Header />
				<Main />
				<Footer />
			</BrowserRouter>
		);
	}
}

export default connect(mapStateToProps)(App);
