import State, {FilesData} from './state';
import {AnyAction, ActionCreator} from 'redux';

export const receiveListOfRepositories: ActionCreator<AnyAction> = (json: string[]) => {
	return {
		type: 'RECEIVE_LIST_OF_REPOSITORIES',
		allRepositories: json
	};
}
export const setRepo: ActionCreator<AnyAction> = (repoName: string) => {
	return {
		type: 'SET_REPO',
		currentRepository: repoName
	};
}
export const setPath: ActionCreator<AnyAction> = (path: string) => {
	return {
		type: 'SET_PATH',
		pathToObject: path
	};
}
export const goToObject: ActionCreator<AnyAction> = (objName: string) => {
	return {
		type: 'GO_TO_OBJECT',
		currentObject: objName
	};
}
export const receiveDirectoryContent: ActionCreator<AnyAction> = (json: FilesData[]) => {
	return {
		type: 'RECEIVE_DIRECTORY_CONTENT',
		currentFiles: json
	};
}
export const receiveFileContent: ActionCreator<AnyAction> = (text: string[]) => {
	return {
		type: 'RECEIVE_FILE_CONTENT',
		fileContent: text
	};
}
// export const receiveRepositoryContentAll: ActionCreator<AnyAction> = (json: FilesData[]) => {
// 	return {
// 		type: 'RECEIVE_REPOSITORY_CONTENT_ALL',
// 		content: json
// 	};
// }
// export const submitSearchForm: ActionCreator<AnyAction> = (inputValue: string) => {
// 	return {
// 		type: 'SUBMIT_SEARCH_FORM',
// 		content: inputValue
// 	};
// }