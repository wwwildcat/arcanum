import { Dispatch } from 'redux';
import {
    getRepoList,
    getDirContent,
    getFileContent,
    // getAllRepoContent
} from './actions';

export const fetchRepoList = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        const response = await fetch('http://localhost:3000/api/repos');
        const json = await response.json();

        dispatch(getRepoList(json));
    };
};

export const fetchDirContent = (repoID: string, dirPath?: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const url = dirPath
            ? `http://localhost:3000/api/repos/${repoID}/tree/master/${dirPath}`
            : `http://localhost:3000/api/repos/${repoID}`;
        const response = await fetch(url);
        const json = await response.json();

        dispatch(getDirContent(json));
    };
};

export const fetchFileContent = (repoID: string, filePath: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const response = await fetch(
            `http://localhost:3000/api/repos/${repoID}/blob/master/${filePath}`
        );
        const json = await response.json();

        dispatch(getFileContent(json));
    };
};

// export const fetchAllRepoContent = (repoID: string) => {
// 	return async function (dispatch: Dispatch): Promise<void> {
// 		const response = await fetch(`http://localhost:3000/api/repos/${repoID}/all`);
// 		const json = await response.json();

// 		dispatch(getAllRepoContent(json));
// 	};
// }
