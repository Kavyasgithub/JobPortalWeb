import axios from 'axios';
import { toast } from 'react-toastify';
import {
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_RESET,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET
} from '../constants/userContants';

// Add job to user's jobs history (frontend only)
export const addJobToHistory = (job) => (dispatch, getState) => {
    dispatch({ type: 'USER_ADD_JOB_HISTORY', payload: job });
    toast.success('Job applied!');
};

// Get All Users (Admin)
export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const {
            signIn: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: userInfo && userInfo.token ? `Bearer ${userInfo.token}` : '',
            },
        };
        const { data } = await axios.get('/api/allusers', config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

// User Sign In Action
export const userSignInAction = (user) => async (dispatch) => {
        dispatch({ type: USER_SIGNIN_REQUEST });

        try{
        const { data } = await axios.post("/api/signin", user);

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data.user // store only the user object
        });
        toast.success('Login successfully!');

    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error || 'Sign in failed');
    }
}

// USER PROFILE ACTION
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_PROFILE_REQUEST });

    try {
        const { data } = await axios.get('/api/me');
        // The backend returns { success, user }, so pass the whole data object
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data // pass the whole data object
        });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message
        });
    }
};

//USER LOGOUT ACTION   
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });

    try {
        const { data } = await axios.get('/api/logout');

        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        localStorage.removeItem('userInfo');
        toast.success('Logout successfully!');

    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error || 'Logout failed');
    }
}
