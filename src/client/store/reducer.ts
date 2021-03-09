import * as redux from 'redux';
import State from './state';

interface Reducer extends redux.Reducer {
	(state: State, action: redux.AnyAction): State
}
//Типы Action
const Types = {
	RECEIVE_LIST_OF_REPOSITORIES: 'RECEIVE_LIST_OF_REPOSITORIES',
	SET_REPO: 'SET_REPO',
	SET_PATH: 'SET_PATH',
	GO_TO_OBJECT: 'GO_TO_OBJECT',
	RECEIVE_DIRECTORY_CONTENT: 'RECEIVE_DIRECTORY_CONTENT',
	RECEIVE_FILE_CONTENT: 'RECEIVE_FILE_CONTENT',
	RECEIVE_REPOSITORY_CONTENT_ALL: 'RECEIVE_REPOSITORY_CONTENT_ALL',
	SUBMIT_SEARCH_FORM: 'SUBMIT_SEARCH_FORM',
	DEFAULT: 'default'
};
//Reducer
export const reducer: Reducer = (state: State, action: redux.AnyAction) => {
	if (action.type === Types.RECEIVE_LIST_OF_REPOSITORIES) {//Получение списка репозиториев
		const data = action.allRepositories;
		const newState: Partial<State> = {
			allRepositories: data,
			isLoading: false
		};
		return Object.assign({}, state, newState);
	}
	// else if (action.type === Types.RECEIVE_REPOSITORY_CONTENT_ALL) {//Получение содержимого всех папок и подпапок репозитория
	// 	const data = action.content;
	// 	const newState = {};
	// 	newState.allFiles = data;
	// 	newState.allFilesFilter = data;
	// 	return Object.assign({}, state, newState);
	// }
	else if (action.type === Types.SET_REPO) { //Запись в state названия текущего репозитория
		const repoName = action.currentRepository;
		const newState: Partial<State> = {};
		newState.currentRepository = repoName;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.SET_PATH) { //Запись в state пути к текущему объекту
		const path = action.pathToObject;
		const newState: Partial<State> = {};
		newState.pathToObject = path;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.GO_TO_OBJECT) {//Переход к папке или файлу
		const objName = action.currentObject;
		const newState: Partial<State> = {};
		newState.currentObject = objName;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_DIRECTORY_CONTENT) {//Получение содержимого папки
		const data = action.currentFiles;
		const newState: Partial<State> = {};
		newState.currentFiles = data;
		if (state.isLoading) {
			newState.isLoading = false;
		}
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_FILE_CONTENT) {//Получение содержимого файла
		const data = action.fileContent;
		const newState: Partial<State> = {};
		newState.fileContent = data;
		return Object.assign({}, state, newState);
	}
	// else if (action.type === Types.SUBMIT_SEARCH_FORM) {//Поиск файлов, содержащих в названии ключевое слово
	// 	const searchInput = action.content.toLowerCase();
	// 	const newState = {};
	// 	const allFilesFilter = state.allFiles.filter(file => file.shortName.toLowerCase().indexOf(searchInput) !== -1);
	// 	newState.allFilesFilter = allFilesFilter;
	// 	newState.viewFiles = 'all';
	// 	return Object.assign({}, state, newState);
	// }
	else {
		return state;
	}
}

