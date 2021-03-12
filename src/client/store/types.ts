export interface FilesData {
	type: 'blob' | 'tree';
	name: string;
	hash: string;
	message: string;
	commiter: string;
	date: string;
}

export const contentTypes = ['name', 'hash', 'message', 'commiter', 'date'] as const;
export type Content = typeof contentTypes[number];

export type TableType = 'blob' | 'tree' | 'branch';

export default interface State {
	isLoading: Boolean;
	allRepos: string[];
	currentRepo: string;
	currentPath: string;
	currentView: string;
	currentFiles: FilesData[];
	fileContent: string[];
}