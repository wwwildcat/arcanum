import { FilesData } from './types';

export const getRepoList = (json: string[]) => ({
	type: 'GET_REPO_LIST',
	payload: json
});

export const setRepo = (repoName: string) => ({
	type: 'SET_REPO',
	payload: repoName
});

export const setPath = (path: string) => ({
	type: 'SET_PATH',
	payload: path
});

export const setView = (view: string) => ({
	type: 'SET_VIEW',
	payload: view
});

export const getDirContent = (json: FilesData[]) => ({
	type: 'GET_DIR_CONTENT',
	payload: json
});

export const getFileContent = (text: string[]) => ({
	type: 'GET_FILE_CONTENT',
	payload: text
});

// export const getAllRepoContent = (json: FilesData[]) => ({
// 	type: 'GET_ALL_REPO_CONTENT',
// 	payload: json
// });

// export const submitSearchForm> = (inputValue: string) => ({
// 	type: 'SUBMIT_SEARCH_FORM',
// 	payload: inputValue
// });
