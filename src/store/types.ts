export interface InitialContentData {
    type: string;
    name: string;
}

export interface FullContentData {
    hash: string;
    message: string;
    commiter: string;
    date: string;
}

export interface ContentData {
    type: 'blob' | 'tree';
    name: string;
    hash: string;
    message: string;
    commiter: string;
    date: string;
}

export interface FileData {
    content: string[];
    size: string;
}

export const contentTypes = ['name', 'hash', 'message', 'commiter', 'date'] as const;
export type Content = typeof contentTypes[number];

export type TableType = 'blob' | 'tree' | 'branch';

export default interface State {
    isLoading: boolean;
    allRepos: string[];
    currentRepo: string;
    currentPath: string[];
    currentView: string;
    currentTableContent: ContentData[];
    currentFile: FileData;
}
