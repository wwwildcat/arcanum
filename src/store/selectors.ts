import State from './types';

export const getAllRepos = (state: State) => state.allRepos;
export const getAllBranches = (state: State) => state.allBranches;
export const getCurrentInfo = (state: State) => state.current;
export const getRepo = (state: State) => state.current.repo;
export const getBranch = (state: State) => state.current.branch;
export const getPath = (state: State) => state.current.path;
export const getBlobData = (state: State) => state.blobData;
export const getTreeData = (state: State) => state.treeData;
export const getErrorData = (state: State) => state.error;
