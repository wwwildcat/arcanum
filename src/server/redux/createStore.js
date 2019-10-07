import {createStore, applyMiddleware} from 'redux';
import {reducer} from './reducer';
import {getInitialData} from './middleware';
import thunk from 'redux-thunk';

const initialState = {
	isLoading: true
};
const store = createStore(reducer, initialState, applyMiddleware(thunk));
store.dispatch(getInitialData());

export default store;