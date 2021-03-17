import { ContentData, BranchData, FileData } from './types';

export const GET_REPO_LIST = 'GET_REPO_LIST';
export const GET_BRANCHES = 'GET_BRANCHES';
export const SET_REPO = 'SET_REPO';
export const SET_BRANCH = 'SET_BRANCH';
export const SET_PATH = 'SET_PATH';
export const SET_VIEW = 'SET_VIEW';
export const GET_DIR_CONTENT = 'GET_DIR_CONTENT';
export const GET_FILE_CONTENT = 'GET_FILE_CONTENT';
export const GET_ALL_REPO_CONTENT = 'GET_ALL_REPO_CONTENT';
export const SUBMIT_SEARCH_FORM = 'SUBMIT_SEARCH_FORM';

interface GetRepoListAction {
    type: typeof GET_REPO_LIST;
    payload: string[];
}

interface GetBranchesAction {
    type: typeof GET_BRANCHES;
    payload: BranchData[];
}

interface SetRepoAction {
    type: typeof SET_REPO;
    payload: string;
}

interface SetBranchAction {
    type: typeof SET_BRANCH;
    payload: string;
}

interface SetPathAction {
    type: typeof SET_PATH;
    payload: string[];
}

interface SetViewAction {
    type: typeof SET_VIEW;
    payload: string;
}

interface GetDirContentAction {
    type: typeof GET_DIR_CONTENT;
    payload: ContentData[];
}

interface GetFileContentAction {
    type: typeof GET_FILE_CONTENT;
    payload: FileData;
}

interface GetAllRepoContentAction {
    type: typeof GET_ALL_REPO_CONTENT;
    payload: ContentData[];
}

interface SubmitSearchFormAction {
    type: typeof SUBMIT_SEARCH_FORM;
    payload: string;
}

export type ActionTypes =
    | GetRepoListAction
    | GetBranchesAction
    | SetRepoAction
    | SetBranchAction
    | SetPathAction
    | SetViewAction
    | GetDirContentAction
    | GetFileContentAction
    | GetAllRepoContentAction
    | SubmitSearchFormAction;
