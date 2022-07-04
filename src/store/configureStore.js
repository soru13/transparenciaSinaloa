import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Map as map } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, map(), composeWithDevTools(applyMiddleware(thunk)));
export default store;
