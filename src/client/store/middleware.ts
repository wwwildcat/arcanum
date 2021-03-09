import {receiveListOfRepositories, receiveDirectoryContent, receiveFileContent/*, receiveRepositoryContentAll*/} from './actions';
import {Dispatch, Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import State from './state'
//Получение списка репозиториев
export const getListOfRepositories: ActionCreator<ThunkAction<Promise<Action>, State, void, Action>> = () => {
	return function (dispatch: Dispatch) {
		return fetch('http://localhost:3030/api/repos')
			.then(response => response.json())
			.then(json => dispatch(receiveListOfRepositories(json)));
	};
}
//Получение содержимого папки
export const getDirectoryContent: ActionCreator<ThunkAction<Promise<Action>, State, void, Action>> = (repositoryId: string, pathToDirectory?: string) => {
	return function (dispatch: Dispatch) {
		const url = pathToDirectory ? `http://localhost:3030/api/repos/${repositoryId}/tree/master/${pathToDirectory}` : `http://localhost:3030/api/repos/${repositoryId}`;
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(receiveDirectoryContent(json)));
	};
}
//Получение содержимого файла
export const getFileContent: ActionCreator<ThunkAction<Promise<Action>, State, void, Action>> = (repositoryId: string, pathToFile: string) => {
	return function (dispatch: Dispatch) {
		return fetch(`http://localhost:3030/api/repos/${repositoryId}/blob/master/${pathToFile}`)
			.then(response => response.json())
			.then(json => dispatch(receiveFileContent(json)));
	};
}
// //Получение содержимого всех папок и подпапок репозитория
// export const getRepositoryContentAll: ActionCreator<ThunkAction<Promise<Action>, State, void, Action>> = (repositoryId: string) => {
// 	return function (dispatch: Dispatch) {
// 		return fetch(`http://localhost:3030/api/repos/${repositoryId}/all`)
// 			.then(response => response.json())
// 			.then(json => dispatch(receiveRepositoryContentAll(json)));
// 	};
// }