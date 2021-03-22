import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
    getRepos,
    getBranches,
    getTree,
    getBlob,
    setRepo,
    setBranch,
    setPath,
    // getAllRepoContent
} from './actions';
import State from './types';

export const fetchRepos = () => {
    return async (dispatch: Dispatch) => {
        const response = await fetch('http://localhost:3000/api/repos');
        const json = await response.json();

        dispatch(getRepos(json));
    };
};

const fetchBranches = (repoID: string, path?: string[]) => {
    return async (dispatch: Dispatch) => {
        const url = path
            ? `http://localhost:3000/api/repos/${repoID}/branches/${path.join('/')}`
            : `http://localhost:3000/api/repos/${repoID}/branches/`;
        const response = await fetch(url);
        const json = await response.json();

        dispatch(getBranches(json));
    };
};

const fetchTree = (repoID: string, branch: string, dirPath?: string[]) => {
    return async (dispatch: Dispatch) => {
        const url = dirPath
            ? `http://localhost:3000/api/repos/${repoID}/tree/${branch}/${dirPath.join('/')}`
            : `http://localhost:3000/api/repos/${repoID}/tree/${branch}`;
        const response = await fetch(url);
        const json = await response.json();

        dispatch(getTree(json));
    };
};

const fetchBlob = (repoID: string, branch: string, filePath: string[]) => {
    return async (dispatch: Dispatch) => {
        const response = await fetch(
            `http://localhost:3000/api/repos/${repoID}/blob/${branch}/${filePath.join('/')}`
        );
        const json = await response.json();

        dispatch(getBlob(json));
    };
};

export const getRepoData = (repo: string) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        dispatch(fetchRepos());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo));
    };
};

export const getTreeData = (repo: string, branch: string, path?: string[]) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        dispatch(fetchRepos());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo, path));
        dispatch(setBranch(branch));
        dispatch(fetchTree(repo, branch, path));

        if (path) {
            dispatch(setPath(path));
        }
    };
};

export const getBlobData = (repo: string, branch: string, path: string[]) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        dispatch(fetchRepos());
        dispatch(setRepo(repo));
        dispatch(fetchBranches(repo, path));
        dispatch(setBranch(branch));
        dispatch(fetchBlob(repo, branch, path));
        dispatch(setPath(path));
    };
};

// export const fetchAllRepoContent = (repoID: string) => {
// 	return async function (dispatch: Dispatch) {
// 		const response = await fetch(`http://localhost:3000/api/repos/${repoID}/all`);
// 		const json = await response.json();

// 		dispatch(getAllRepoContent(json));
// 	};
// }
