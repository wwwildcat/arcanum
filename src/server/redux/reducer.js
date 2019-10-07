//Типы Action
const Types = {
	RECEIVE_LIST_OF_REPOSITORIES: 'RECEIVE_LIST_OF_REPOSITORIES',
	RECEIVE_REPOSITORY_CONTENT: 'RECEIVE_REPOSITORY_CONTENT',
	SET_REPO: 'SET_REPO',
	SET_PATH: 'SET_PATH',
	GO_TO_DIRECTORY: 'GO_TO_DIRECTORY',
	RECEIVE_DIRECTORY_CONTENT: 'RECEIVE_DIRECTORY_CONTENT',
	GO_TO_FILE: 'GO_TO_FILE',
	RECEIVE_FILE_CONTENT: 'RECEIVE_FILE_CONTENT',
	RECEIVE_REPOSITORY_CONTENT_ALL: 'RECEIVE_REPOSITORY_CONTENT_ALL',
	SUBMIT_SEARCH_FORM: 'SUBMIT_SEARCH_FORM',
	DEFAULT: 'default'
};
//Reducer
export function reducer(state, action) {
	if (action.type === Types.RECEIVE_LIST_OF_REPOSITORIES) {//Получение списка репозиториев
		const data = action.content;
		const newState = {
			allRepositories: data,
			currentRepository: data[0],
			currentObject: data[0],
			pathToObject: [],
			isLoading: true,
			viewFiles: 'root'
		};
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_REPOSITORY_CONTENT) {//Получение содержимого корневой папки репозитория
		const data = action.content;
		const newState = {};
		newState.currentFiles = data;
		newState.isLoading = false;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_REPOSITORY_CONTENT_ALL) {//Получение содержимого всех папок и подпапок репозитория
		const data = action.content;
		const newState = {};
		newState.allFiles = data;
		newState.allFilesFilter = data;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.SET_REPO) {
		const repoName = action.content;
		const newState = {};
		newState.currentRepository = repoName;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.SET_PATH) {
		const path = action.content ? action.content.split('/') : [];
		const newState = {};
		newState.pathToObject = path;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.GO_TO_DIRECTORY) {//Переход в подпапку
		const dirName = action.content;
		const newState = {};
		newState.currentObject = dirName;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_DIRECTORY_CONTENT) {//Получение содержимого подпапки репозитория
		const data = action.content;
		const newState = {};
		newState.currentFiles = data;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.GO_TO_FILE) {//Переход к содержимому файла
		const fileName = action.content;
		const newState = {};
		newState.currentObject = fileName;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.RECEIVE_FILE_CONTENT) {//Получение содержимого файла
		const data = action.content;
		const newState = {};
		newState.fileContent = data;
		return Object.assign({}, state, newState);
	}
	else if (action.type === Types.SUBMIT_SEARCH_FORM) {//Поиск файлов, содержащих в названии ключевое слово
		const searchInput = action.content.toLowerCase();
		const newState = {};
		const allFilesFilter = state.allFiles.filter(file => file.shortName.toLowerCase().indexOf(searchInput) !== -1);
		newState.allFilesFilter = allFilesFilter;
		newState.viewFiles = 'all';
		return Object.assign({}, state, newState);
	}
	else {
		return state;
	}
}

