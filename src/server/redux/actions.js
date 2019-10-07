export function receiveListOfRepositories(json) {
	return {
		type: 'RECEIVE_LIST_OF_REPOSITORIES',
		content: json
	};
}
export function receiveRepositoryContent(json) {
	return {
		type: 'RECEIVE_REPOSITORY_CONTENT',
		content: json
	};
}
export function setRepo(repoName) {
	return {
		type: 'SET_REPO',
		content: repoName
	};
}
export function setPath(path) {
	return {
		type: 'SET_PATH',
		content: path
	};
}
export function goToDirectory(dirName) {
	return {
		type: 'GO_TO_DIRECTORY',
		content: dirName
	};
}
export function receiveDirectoryContent(json) {
	return {
		type: 'RECEIVE_DIRECTORY_CONTENT',
		content: json
	};
}
export function goToFile(fileName) {
	return {
		type: 'GO_TO_DIRECTORY',
		content: fileName
	};
}
export function receiveFileContent(text) {
	return {
		type: 'RECEIVE_FILE_CONTENT',
		content: text
	};
}
export function receiveRepositoryContentAll(json) {
	return {
		type: 'RECEIVE_REPOSITORY_CONTENT_ALL',
		content: json
	};
}
export function submitSearchForm(inputValue) {
	return {
		type: 'SUBMIT_SEARCH_FORM',
		content: inputValue
	};
}