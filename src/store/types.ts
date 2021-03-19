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

export interface BranchData {
    type: 'branch';
    name: string;
    hash: string;
    date: string;
}

export interface FileData {
    content: string[];
    size: string;
}

export const columnTypes = ['name', 'hash', 'message', 'commiter', 'date'] as const;
export type ColumnData = typeof columnTypes[number];

export default interface State {
    allRepos: string[];
    allBranches: BranchData[];
    currentRepo: string;
    currentBranch: string;
    currentPath: string[];
    currentView: string;
    currentTableContent: ContentData[];
    currentFile: FileData;
}
