import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
