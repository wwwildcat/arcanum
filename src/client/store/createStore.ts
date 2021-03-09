import {createStore, applyMiddleware, AnyAction} from 'redux';
import {reducer} from './reducer';
import {getListOfRepositories} from './middleware';
import State from './state';
import thunk, {ThunkDispatch} from 'redux-thunk';

interface StoreExtension {
	dispatch: ThunkDispatch<State, void, AnyAction>;
}

const initialState = {
	isLoading: true,
	allRepositories: [],
	currentRepository: '',
	pathToObject: '',
	currentObject: '',
	currentFiles: [],
	fileContent: []
};
const store = createStore<State, AnyAction, StoreExtension, void>(reducer, initialState, applyMiddleware(thunk));
store.dispatch(getListOfRepositories());

export default store;