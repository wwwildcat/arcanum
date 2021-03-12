import React from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Current from '../Current/Current';
import Tabs from '../Tabs/Tabs';
import Table from '../Table/Table';
import Viewer from '../Viewer/Viewer';
import NotFound from '../NotFound/NotFound';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setView, setPath, setRepo } from '../../store/actions';
import { fetchDirContent, fetchFileContent } from '../../store/thunks';
import State, { TableType } from '../../store/types';

interface RouteParams {
	repoID: string;
	path: string;
}

interface Props extends RouteComponentProps<RouteParams> {
	isLoading: Boolean;
	allRepos: string[];
	currentRepo: string;
	currentPath: string;
	getData: (type: TableType, value: string, repo: string, path?: string) => void;
	setCurrentRepo: (value: string) => void;
	setCurrentPath: (path: string) => void;
}

const mapStateToProps = (state: State) => ({
		isLoading: state.isLoading,
		allRepos: state.allRepos,
		currentRepo: state.currentRepo,
		currentPath: state.currentPath
	});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
		getData: (type: TableType, value: string, repo: string, path?: string) => {
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

		setCurrentRepo: (value: string) => {
			dispatch(setRepo(value));
		}
	});


class Files extends React.Component<Props> {
	componentDidMount() {
		const {
			allRepos,
			match: {
				params: {
					repoID,
					path
				}
			},
			setCurrentRepo,
			setCurrentPath,
		} = this.props;

		setCurrentRepo(repoID);
		setCurrentPath(path);
		window.addEventListener('popstate', this.onBackForwardButtonEvent);

		if (allRepos && allRepos.indexOf(repoID) !== -1) {
			this.goToURL();
		}
	}

	componentDidUpdate(prevProps: Props) {
		const {
			allRepos,
			match: {
				params: {
					repoID,
					path
				}
			},
			setCurrentRepo,
			setCurrentPath,
		} = this.props;

		if (path !== prevProps.match.params.path) {
			setCurrentPath(path);
		}

		if (repoID !== prevProps.match.params.repoID) {
			setCurrentRepo(repoID);
		}

		if (allRepos !== prevProps.allRepos) {
			this.goToURL();
		}
	}

	goToURL = () => {
		const {
			match: {
				params: {
					repoID,
					path
				},
				url
			},
			getData,
		} = this.props;

		if (path) {
			const type = url.split('/')[2];
			const view = path.split('/').reverse()[0];

			if (type === 'tree' || type === 'blob') {
				getData(type, view, repoID, path);
			}
		} else {
			getData('tree', repoID, repoID);
		}
	}

	onBackForwardButtonEvent = (e: PopStateEvent) => {
		e.preventDefault();
		this.goToURL();
	}

	render() {
		const { allRepos, isLoading, match: { params: { repoID }, url } } = this.props;
		const type = url.split('/')[2] as 'blob' | 'tree';

		return (
			<>
				{!isLoading && allRepos.indexOf(repoID) === -1 &&
					<NotFound />}
				{!isLoading &&
					<>
						<BreadCrumbs />
						<Current />
						<Tabs type={type ? type : 'tree'}/>
						{type === 'blob' && <Viewer />}
						{type !== 'blob' && <Table content='files' />}

					</>}
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);