import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Current from '../Current/Current';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import Viewer from '../Viewer/Viewer';
import NotFound from '../NotFound/NotFound';
import {connect} from 'react-redux';
import {goToDirectory, goToFile, setPath, setRepo} from '../../server/redux/actions';
import {getDirectoryContent, getFileContent} from '../../server/redux/middleware';

function mapStateToProps(state) {
	return {
		allRepositories: state.allRepositories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getData: (type, value, repo, path) => {
			if (type === 'tree') {
				dispatch(goToDirectory(value));
				dispatch(getDirectoryContent(repo, path));
			}
			if (type === 'blob') {
				dispatch(goToFile(value));
				dispatch(getFileContent(repo, path));
			}
		},
		setCurrentPath: (path) => {
			dispatch(setPath(path));
		},
		setCurrentRepository: (value) => {
			dispatch(setRepo(value));
		}
	};
}


class Files extends React.Component {
	constructor(props) {
		super(props);
		this.onBackForwardButtonEvent = this.onBackForwardButtonEvent.bind(this);
	}
	componentDidMount() {
		this.props.setCurrentRepository(this.props.match.params.repositoryID);
		this.props.setCurrentPath(this.props.match.params.path);
		window.addEventListener('popstate', this.onBackForwardButtonEvent);
		if (this.props.allRepositories.indexOf(this.props.match.params.repositoryID) !== -1) {
			this.goToURL();
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.match.params.path !== prevProps.match.params.path) {
			this.props.setCurrentPath(this.props.match.params.path);
		}
		if (this.props.match.params.repositoryID !== prevProps.match.params.repositoryID) {
			this.props.setCurrentRepository(this.props.match.params.repositoryID);
		}
	}
	goToURL() {
		const currentRepo = this.props.match.params.repositoryID;
		const currentPath = this.props.match.params.path;
		if(currentPath) {
			const currentType = this.props.location.pathname.split('/')[2];
			const currentObj = currentPath.split('/').reverse()[0];
			this.props.getData(currentType, currentObj, currentRepo, currentPath);
		}
		else {
			this.props.getData('tree', currentRepo, currentRepo);
		}
	}
	onBackForwardButtonEvent(e) {
		e.preventDefault();
		this.goToURL();
	}
	render() {
		if (this.props.allRepositories.indexOf(this.props.match.params.repositoryID) === -1) {
			return (
				<NotFound />
			);
		}
		else if (this.props.location.pathname.split('/')[2] === 'blob') {
			return (
				<>
					<BreadCrumbs />
					<Current />
					<Tabs />
					<Viewer />
				</>
			);
		}
		else return (
			<>
				<BreadCrumbs />
				<Current />
				<Tabs />
				<Table />
			</>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);