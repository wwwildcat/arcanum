import { Action, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
    setRepos,
    setBranches,
    setTreeData,
    setBlobData,
    setRepo,
    setBranch,
    setPath,
    setError,
} from './actions';
import State, { BranchData } from './types';

const fetchThunk = (url: string, onSuccess: ActionCreator<Action>) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const baseApiUrl = 'http://localhost:3000/api/repos';
            const response = await fetch(`${baseApiUrl}/${url}`);
            const json = await response.json();

            dispatch(onSuccess(json));

            return json;
        } catch (err) {
            dispatch(setError(err));

            return err;
        }
    };
};

export const fetchRepos = () => fetchThunk('', setRepos);

const fetchBranches = (repoID: string, path?: string[]) => {
    const url = path ? `${repoID}/branches/${path.join('/')}` : `${repoID}/branches`;

    return fetchThunk(url, setBranches);
};

const fetchTree = (repoID: string, branch: string, dirPath?: string[]) => {
    const url = dirPath
        ? `${repoID}/tree/${branch}/${dirPath.join('/')}`
        : `${repoID}/tree/${branch}`;

    return fetchThunk(url, setTreeData);
};

const fetchBlob = (repoID: string, branch: string, filePath: string[]) =>
    fetchThunk(`${repoID}/blob/${branch}/${filePath.join('/')}`, setBlobData);

export const getRepoData = (repo: string, path?: string[]) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const repos = await dispatch(fetchRepos());

            if (!repos.includes(repo)) {
                throw new Error('No such repo');
            } else {
                dispatch(setRepo(repo));

                const branches = await dispatch(fetchBranches(repo, path));

                return branches;
            }
        } catch (err) {
            dispatch(setError(err));

            return err;
        }
    };
};

export const getTreeData = (repo: string, branch: string, path?: string[]) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const branches = await dispatch(getRepoData(repo, path));

            if (branches.find((item: BranchData) => item.name === branch)) {
                dispatch(setBranch(branch));

                const tree = await dispatch(fetchTree(repo, branch, path));
                if (Array.isArray(tree) && path) {
                    dispatch(setPath(path));
                }
            } else {
                throw new Error('No such branch');
            }
        } catch (err) {
            dispatch(setError(err));
        }
    };
};

export const getBlobData = (repo: string, branch: string, path: string[]) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const branches = await dispatch(getRepoData(repo, path));

            if (branches.find((item: BranchData) => item.name === branch)) {
                dispatch(setBranch(branch));

                const blob = await dispatch(fetchBlob(repo, branch, path));

                if (blob.content) {
                    dispatch(setPath(path));
                }
            } else {
                throw new Error('No such branch');
            }
        } catch (err) {
            dispatch(setError(err));
        }
    };
};
