import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import reducer from './reducers';
import { fetchRepoList } from './thunks';
import State from './types';

interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

const initialState = {
    isLoading: true,
    allRepos: [],
    currentRepo: '',
    currentPath: [],
    currentView: '',
    currentTableContent: [],
    currentFile: {
        content: [],
        size: '',
    },
};
const store = createStore<State, AnyAction, StoreExtension, void>(
    reducer,
    initialState,
    applyMiddleware(thunk)
);

store.dispatch(fetchRepoList());

export default store;
