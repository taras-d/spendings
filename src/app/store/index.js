import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import userReducer from './user';

// Root reducer
const reducer = combineReducers({
    user: userReducer
});

// Middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(
    applyMiddleware( ReduxThunk )
);

// Store
const store = createStore(reducer, middleware);

export default store;