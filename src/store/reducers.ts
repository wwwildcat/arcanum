import { AnyAction } from 'redux';
import {
    GET_REPOS,
    GET_BRANCHES,
    SET_REPO,
    SET_BRANCH,
    SET_PATH,
    GET_TREE,
    GET_BLOB,
    // GET_ALL_REPO_CONTENT,
    // SUBMIT_SEARCH_FORM
} from './actionTypes';
import State from './types';

const reducer = (state: State, action: AnyAction) => {
    switch (action.type) {
        case GET_REPOS:
            return {
                ...state,
                allRepos: action.payload,
            };

        case GET_BRANCHES:
            return {
                ...state,
                allBranches: action.payload,
            };

        // case GET_ALL_REPO_CONTENT:
        // return {
        // 	...state,
        // 	allFiles: action.payload,
        // 	allFilesFilter: action.payload
        // };

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

        case GET_TREE:
            return {
                ...state,
                treeData: action.payload,
            };

        case GET_BLOB:
            return {
                ...state,
                blobData: action.payload,
            };

        // case SUBMIT_SEARCH_FORM: //Поиск файлов, содержащих в названии ключевое слово
        // 	const searchInput = action.payload.toLowerCase();
        // 	const allFilesFilter = state.allFiles.filter(file => file.shortName.toLowerCase().indexOf(searchInput) !== -1);

        // return {
        // 	 ...state,
        // 	 allFilesFilter: allFilesFilter,
        // 	 viewFiles: 'all'
        //  };
        // }

        default: {
            return state;
        }
    }
};

export default reducer;
