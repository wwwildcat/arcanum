import { ActionTypes } from './actionTypes';
import { ContentData, BranchData, FileData } from './types';

export const getRepoList = (json: string[]): ActionTypes => ({
    type: 'GET_REPO_LIST',
    payload: json,
});

export const getBranches = (json: BranchData[]): ActionTypes => ({
    type: 'GET_BRANCHES',
    payload: json,
});

export const setRepo = (repo: string): ActionTypes => ({
    type: 'SET_REPO',
    payload: repo,
});

export const setBranch = (branch: string): ActionTypes => ({
    type: 'SET_BRANCH',
    payload: branch,
});

export const setPath = (path: string[]): ActionTypes => ({
    type: 'SET_PATH',
    payload: path,
});

export const setView = (view: string): ActionTypes => ({
    type: 'SET_VIEW',
    payload: view,
});

export const getDirContent = (json: ContentData[]): ActionTypes => ({
    type: 'GET_DIR_CONTENT',
    payload: json,
});

export const getFileContent = (json: FileData): ActionTypes => ({
    type: 'GET_FILE_CONTENT',
    payload: json,
});

// export const getAllRepoContent = (json: ContentData[]): ActionTypes => ({
// 	type: 'GET_ALL_REPO_CONTENT',
// 	payload: json
// });

// export const submitSearchForm> = (inputValue: string): ActionTypes => ({
// 	type: 'SUBMIT_SEARCH_FORM',
// 	payload: inputValue
// });
