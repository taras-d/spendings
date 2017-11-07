import { createActions, handleActions } from 'redux-actions';

// Action creators
const { userLogin, userLogout, userUpdate } = createActions({
    USER_LOGIN: user => user,
    USER_LOGOUT: () => null,
    USER_UPDATE: user => user
});
export { userLogin, userLogout, userUpdate };

// Reducer
export default handleActions({
    USER_LOGIN: (state, action) => action.payload,
    USER_LOGOUT: (state, action) => null,
    USER_UPDATE: (state, action) => action.payload
}, null);
