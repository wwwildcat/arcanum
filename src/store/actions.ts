import { ObjectData, BranchData, BlobData } from './types';

export const setRepos = (json: string[]) => ({
    type: 'SET_REPOS',
    payload: json,
});

export const setBranches = (json: BranchData[]) => ({
    type: 'SET_BRANCHES',
    payload: json,
});

export const setError = (err: Error) => ({
    type: 'SET_ERROR',
    payload: err,
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

export const setTreeData = (json: ObjectData[]) => ({
    type: 'SET_TREE',
    payload: json,
});

export const setBlobData = (json: BlobData) => ({
    type: 'SET_BLOB',
    payload: json,
});
