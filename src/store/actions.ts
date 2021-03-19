import { ObjectData, BranchData, FileData } from './types';

export const getRepoList = (json: string[]) => ({
    type: 'GET_REPO_LIST',
    payload: json,
});

export const getBranches = (json: BranchData[]) => ({
    type: 'GET_BRANCHES',
    payload: json,
});

export const setRepo = (repo: string) => ({
    type: 'SET_REPO',
    payload: repo,
});

export const setBranch = (branch: string) => ({
    type: 'SET_BRANCH',
    payload: branch,
});

export const setPath = (path: string[]) => ({
    type: 'SET_PATH',
    payload: path,
});

export const setView = (view: string) => ({
    type: 'SET_VIEW',
    payload: view,
});

export const getDirContent = (json: ObjectData[]) => ({
    type: 'GET_DIR_CONTENT',
    payload: json,
});

export const getFileContent = (json: FileData) => ({
    type: 'GET_FILE_CONTENT',
    payload: json,
});

// export const getAllRepoContent = (json: ObjectData[]) => ({
// 	type: 'GET_ALL_REPO_CONTENT',
// 	payload: json
// });

// export const submitSearchForm> = (inputValue: string) => ({
// 	type: 'SUBMIT_SEARCH_FORM',
// 	payload: inputValue
// });
