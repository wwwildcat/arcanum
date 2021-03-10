import {
	getRepoList,
	getDirContent,
	getFileContent,
	// getAllRepoContent
} from './actions';
import { Dispatch } from 'redux';

export const fetchRepoList = () => {
	return async function (dispatch: Dispatch) {
		const response = await fetch('http://localhost:3030/api/repos');
		const json = await response.json();

		dispatch(getRepoList(json));
	};
}

export const fetchDirContent = (repoID: string, dirPath?: string) => {
	return async function (dispatch: Dispatch) {
		const url = dirPath
			? `http://localhost:3030/api/repos/${repoID}/tree/master/${dirPath}`
			: `http://localhost:3030/api/repos/${repoID}`;
		const response = await fetch(url);
		const json = await response.json();

		dispatch(getDirContent(json));
	};
}

export const fetchFileContent = (repoID: string, pathToFile: string) => {
	return async function (dispatch: Dispatch) {
		const response = await fetch(`http://localhost:3030/api/repos/${repoID}/blob/master/${pathToFile}`);
		const json = await response.json();

		dispatch(getFileContent(json));
	};
}

// export const fetchAllRepoContent = (repoID: string) => {
// 	return async function (dispatch: Dispatch) {
// 		const response = await fetch(`http://localhost:3030/api/repos/${repoID}/all`);
// 		const json = await response.json();

// 		dispatch(getAllRepoContent(json));
// 	};
// }