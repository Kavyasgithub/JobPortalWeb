import {createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

//combine reducers
import { loadJobReducer } from './reducers/jobReducer';
import { loadJobTypeReducer } from './reducers/jobTypeReducers';
import { userReducerProfile, userReducerSignIn, userListReducer, userReducerLogout } from './reducers/userReducer';

const reducer = combineReducers({
    loadJobs: loadJobReducer,
    loadJobTypes: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logout: userReducerLogout,
    userProfile: userReducerProfile,
    userList: userListReducer
});


// initial state
const initialState = {
    signIn: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    }
};
const middleware = [thunk];  //thunk is a async action creator
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export store
export default store;