import { AnyAction } from 'redux';
import {
    SET_REPOS,
    SET_BRANCHES,
    SET_ERROR,
    SET_REPO,
    SET_BRANCH,
    SET_PATH,
    SET_TREE,
    SET_BLOB,
} from './actionTypes';
import State from './types';

const reducer = (state: State, action: AnyAction) => {
    switch (action.type) {
        case SET_REPOS:
            return {
                ...state,
                allRepos: action.payload,
            };

        case SET_BRANCHES:
            return {
                ...state,
                allBranches: action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case SET_REPO:
            return {
                ...state,
                current: {
                    ...state.current,
                    repo: action.payload,
                },
            };

        case SET_BRANCH:
            return {
                ...state,
                current: {
                    ...state.current,
                    branch: action.payload,
                },
            };

        case SET_PATH:
            return {
                ...state,
                current: {
                    ...state.current,
                    path: action.payload,
                },
            };

        case SET_TREE:
            return {
                ...state,
                treeData: action.payload,
            };

        case SET_BLOB:
            return {
                ...state,
                blobData: action.payload,
            };

        default: {
            return state;
        }
    }
};

export default reducer;
