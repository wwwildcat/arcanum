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
	allRepos: string[];
	currentRepo: string;
	currentPath: string;
	currentView: string;
	currentFiles: FilesData[];
	fileContent: string[];
}