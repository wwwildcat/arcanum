export interface TreeData {
    type: string;
    name: string;
}

export interface CommitData {
    hash: string;
    message: string;
    commiter: string;
    date: string;
    absDate: string;
}

export interface ObjectData extends TreeData, CommitData {
    type: 'blob' | 'tree';
}

export interface BranchData {
    type: 'branch';
    name: string;
    hash: string;
    date: string;
}

export interface BlobData extends CommitData {
    content: string[];
    size: string;
}

export const columnTypes = ['name', 'hash', 'message', 'commiter', 'date'] as const;
export type ColumnData = typeof columnTypes[number];

interface CurrentData {
    repo: string;
    branch: string;
    path: string[];
}

export default interface State {
    allRepos: string[];
    allBranches: BranchData[];
    current: CurrentData;
    error: Error;
    treeData: ObjectData[];
    blobData: BlobData;
}
