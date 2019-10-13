export interface FilesData {
	type: 'blob' | 'tree';
	name: string;
	hash: string;
	message: string;
	commiter: string;
	date: string;
}

export default interface State {
	isLoading: Boolean;
	allRepositories: string[];
	currentRepository: string;
	pathToObject: string;
	currentObject: string;
	currentFiles: FilesData[];
	fileContent: string[];
}