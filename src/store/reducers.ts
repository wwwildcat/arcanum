import { AnyAction } from 'redux';
import {
    GET_REPO_LIST,
    GET_BRANCHES,
    SET_REPO,
    SET_BRANCH,
    SET_PATH,
    SET_VIEW,
    GET_DIR_CONTENT,
    GET_FILE_CONTENT,
    // GET_ALL_REPO_CONTENT,
    // SUBMIT_SEARCH_FORM
} from './actionTypes';
import State from './types';

const reducer = (state: State, action: AnyAction) => {
    switch (action.type) {
        case GET_REPO_LIST:
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
                currentRepo: action.payload,
            };

        case SET_BRANCH:
            return {
                ...state,
                currentBranch: action.payload,
            };

        case SET_PATH:
            return {
                ...state,
                currentPath: action.payload,
            };

        case SET_VIEW: // current dir or file
            return {
                ...state,
                currentView: action.payload,
            };

        case GET_DIR_CONTENT:
            return {
                ...state,
                isLoading: false,
                currentTableContent: action.payload,
            };

        case GET_FILE_CONTENT:
            return {
                ...state,
                currentFile: action.payload,
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
