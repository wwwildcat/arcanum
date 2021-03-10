import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import {Current} from '../Current/Current';
import {Tabs} from '../Tabs/Tabs';
import Table from '../Table/Table';
import {Viewer} from '../Viewer/Viewer';
import {NotFound} from '../NotFound/NotFound';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {setView, setPath, setRepo} from '../../store/actions';
import {fetchDirContent, fetchFileContent} from '../../store/thunks';
import State from '../../store/types';

interface RouteParams {
	repoID: string;
	path: string;
}

interface Props extends RouteComponentProps<RouteParams> {
	isLoading: Boolean;
	allRepos: string[];
	currentRepo: string;
	currentPath: string;
	getData: (type: 'tree' | 'blob' | 'branch', value: string, repo: string, path?: string) => void;
	setcurrentRepo: (value: string) => void;
	setCurrentPath: (path: string) => void;
}

const mapStateToProps = (state: State) => ({
		isLoading: state.isLoading,
		allRepos: state.allRepos,
		currentRepo: state.currentRepo,
		currentPath: state.currentPath
	});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
		getData: (type: 'tree' | 'blob' | 'branch', value: string, repo: string, path?: string) => {
			dispatch(setView(value));
			if (type === 'tree') {
				dispatch(fetchDirContent(repo, path));
			}
			if (type === 'blob' && path) {
				dispatch(fetchFileContent(repo, path));
			}
		},
		setCurrentPath: (path: string) => {
			dispatch(setPath(path));
		},
		setcurrentRepo: (value: string) => {
			dispatch(setRepo(value));
		}
	});


class Files extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.onBackForwardButtonEvent = this.onBackForwardButtonEvent.bind(this);
	}
	componentDidMount() {
		this.props.setcurrentRepo(this.props.match.params.repoID);
		this.props.setCurrentPath(this.props.match.params.path);
		window.addEventListener('popstate', this.onBackForwardButtonEvent);
		if (this.props.allRepos && this.props.allRepos.indexOf(this.props.match.params.repoID) !== -1) {
			this.goToURL();
		}
	}
	componentDidUpdate(prevProps: Props) {
		if (this.props.match.params.path !== prevProps.match.params.path) {
			this.props.setCurrentPath(this.props.match.params.path);
		}
		if (this.props.match.params.repoID !== prevProps.match.params.repoID) {
			this.props.setcurrentRepo(this.props.match.params.repoID);
		}
		if (this.props.allRepos !== prevProps.allRepos) {
			this.goToURL();
		}
	}
	goToURL() {
		const currentRepo = this.props.match.params.repoID;
		const currentPath = this.props.match.params.path;
		if(currentPath) {
			const currentType = this.props.location.pathname.split('/')[2];
			const currentObj = currentPath.split('/').reverse()[0];
			if (currentType === 'tree' || currentType === 'blob') {
				this.props.getData(currentType, currentObj, currentRepo, currentPath);
			}
		}
		else {
			this.props.getData('tree', currentRepo, currentRepo);
		}
	}
	onBackForwardButtonEvent(e: PopStateEvent) {
		e.preventDefault();
		this.goToURL();
	}
	render() {
		if (this.props.isLoading) {
			return (<div></div>);
		}
		else if (this.props.allRepos.indexOf(this.props.match.params.repoID) === -1) {
			return (
				<NotFound />
			);
		}
		else if (this.props.location.pathname.split('/')[2] === 'blob') {
			return (
				<>
					<BreadCrumbs />
					<Current />
					<Tabs type='blob'/>
					<Viewer />
				</>
			);
		}
		else return (
			<>
				<BreadCrumbs />
				<Current />
				<Tabs type='tree'/>
				<Table content='files'/>
			</>
		);
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);