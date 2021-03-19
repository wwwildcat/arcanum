import { Dispatch } from 'redux';
import {
    getRepoList,
    getBranches,
    getDirContent,
    getFileContent,
    // getAllRepoContent
} from './actions';

export const fetchRepoList = () => {
    return async (dispatch: Dispatch) => {
        const response = await fetch('http://localhost:3000/api/repos');
        const json = await response.json();

        dispatch(getRepoList(json));
    };
};

export const fetchBranches = (repoID: string, path?: string[]) => {
    return async (dispatch: Dispatch) => {
        const url = path
            ? `http://localhost:3000/api/repos/${repoID}/branches/${path.join('/')}`
            : `http://localhost:3000/api/repos/${repoID}/branches/`;
        const response = await fetch(url);
        const json = await response.json();

        dispatch(getBranches(json));
    };
};

export const fetchDirContent = (repoID: string, branch: string, dirPath?: string[]) => {
    return async (dispatch: Dispatch) => {
        const url = dirPath
            ? `http://localhost:3000/api/repos/${repoID}/tree/${branch}/${dirPath.join('/')}`
            : `http://localhost:3000/api/repos/${repoID}/tree/${branch}`;
        const response = await fetch(url);
        const json = await response.json();

        dispatch(getDirContent(json));
    };
};

export const fetchFileContent = (repoID: string, branch: string, filePath: string[]) => {
    return async (dispatch: Dispatch) => {
        const response = await fetch(
            `http://localhost:3000/api/repos/${repoID}/blob/${branch}/${filePath.join('/')}`
        );
        const json = await response.json();

        dispatch(getFileContent(json));
    };
};

// export const fetchAllRepoContent = (repoID: string) => {
// 	return async function (dispatch: Dispatch) {
// 		const response = await fetch(`http://localhost:3000/api/repos/${repoID}/all`);
// 		const json = await response.json();

// 		dispatch(getAllRepoContent(json));
// 	};
// }
