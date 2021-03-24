/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo } from 'react';
import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import reducer from './reducers';
import State from './types';

interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

let store: Store;

const initialState = {
    allRepos: [],
    allBranches: [],
    current: {
        repo: '',
        branch: '',
        path: [],
    },
    error: null,
    treeData: [],
    blobData: null,
};

const initStore = (preloadedState = initialState) => {
    return createStore<State, AnyAction, StoreExtension, void>(
        reducer,
        preloadedState,
        applyMiddleware(thunk)
    );
};

export const initializeStore = (
    preloadedState?: State
): Store<State, AnyAction> & StoreExtension => {
    let _store = store ?? initStore(preloadedState);

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });

        store = null;
    }

    if (typeof window === 'undefined') return _store;

    if (!store) store = _store;

    return _store;
};

export const useStore = (state: State): Store<State, AnyAction> & StoreExtension =>
    useMemo(() => initializeStore(state), [state]);
