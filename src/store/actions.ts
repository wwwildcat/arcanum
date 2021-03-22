import { ObjectData, BranchData, FileData } from './types';

export const getRepos = (json: string[]) => ({
    type: 'GET_REPOS',
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

export const getTree = (json: ObjectData[]) => ({
    type: 'GET_TREE',
    payload: json,
});

export const getBlob = (json: FileData) => ({
    type: 'GET_BLOB',
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
