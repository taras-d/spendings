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

// Export function which create store
export default preloadedState => createStore(reducer, preloadedState, middleware);