import {receiveListOfRepositories, receiveDirectoryContent, receiveFileContent, receiveRepositoryContentAll} from './actions.js';
//Получение списка репозиториев
export function getListOfRepositories() {
	return function (dispatch) {
		return fetch('http://localhost:3030/api/repos')
			.then(response => response.json())
			.then(json => dispatch(receiveListOfRepositories(json)));
	};
}
//Получение содержимого папки
export function getDirectoryContent(repositoryId, pathToDirectory) {
	return function (dispatch) {
		const url = pathToDirectory ? `http://localhost:3030/api/repos/${repositoryId}/tree/master/${pathToDirectory}` : `http://localhost:3030/api/repos/${repositoryId}`;
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(receiveDirectoryContent(json)));
	};
}
//Получение содержимого файла
export function getFileContent(repositoryId, pathToFile) {
	return function (dispatch) {
		return fetch(`http://localhost:3030/api/repos/${repositoryId}/blob/master/${pathToFile}`)
			.then(response => response.json())
			.then(json => dispatch(receiveFileContent(json)));
	};
}
//Получение содержимого всех папок и подпапок репозитория
export function getRepositoryContentAll(repositoryId) {
	return function (dispatch) {
		return fetch(`http://localhost:3030/api/repos/${repositoryId}/all`)
			.then(response => response.json())
			.then(json => dispatch(receiveRepositoryContentAll(json)));
	};
}