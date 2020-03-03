import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const initialState = {
    users: [],
    status: 'loading' // loading/success/err
};
const store = createStore(reducers, initialState, composeWithDevTools(
    applyMiddleware(thunk)));

export default store;
