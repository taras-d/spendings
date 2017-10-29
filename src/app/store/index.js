import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

// Root reducer
// Replace it with your root reducer
const reducer = (state = {}, action) => state;

// Middleware
// By default middleware includes Redux DevTool extension (if available) and ReduxThunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(
    applyMiddleware( ReduxThunk )
);

// Store
const store = createStore(reducer, middleware);

export default store;