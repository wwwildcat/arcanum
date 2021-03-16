import { ActionTypes } from './actionTypes';
import { FilesData } from './types';

export const getRepoList = (json: string[]): ActionTypes => ({
    type: 'GET_REPO_LIST',
    payload: json,
});

export const setRepo = (repoName: string): ActionTypes => ({
    type: 'SET_REPO',
    payload: repoName,
});

export const setPath = (path: string[]): ActionTypes => ({
    type: 'SET_PATH',
    payload: path,
});

export const setView = (view: string): ActionTypes => ({
    type: 'SET_VIEW',
    payload: view,
});

export const getDirContent = (json: FilesData[]): ActionTypes => ({
    type: 'GET_DIR_CONTENT',
    payload: json,
});

export const getFileContent = (text: string[]): ActionTypes => ({
    type: 'GET_FILE_CONTENT',
    payload: text,
});

// export const getAllRepoContent = (json: FilesData[]): ActionTypes => ({
// 	type: 'GET_ALL_REPO_CONTENT',
// 	payload: json
// });

// export const submitSearchForm> = (inputValue: string): ActionTypes => ({
// 	type: 'SUBMIT_SEARCH_FORM',
// 	payload: inputValue
// });
