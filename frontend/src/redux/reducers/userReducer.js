
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_RESET,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET
} from "../constants/userContants";

import { USER_ADD_JOB_HISTORY } from '../constants/userContants';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userReducerSignIn = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, userInfo: null, isAuthenticated: false };
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload, // user object only
        isAuthenticated: true,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        userInfo: null,
        error: action.payload,
        isAuthenticated: false,
      };
    case USER_SIGNIN_RESET:
      return {};
    default:
      return state;
  }
};



export const userReducerProfile = (state = {user: null}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true, user: null };
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload.user };
    case USER_PROFILE_FAIL:
      return { loading: false, user: null, error: action.payload };
    case USER_PROFILE_RESET:
      return {};
    case USER_ADD_JOB_HISTORY:
      // Add job to jobsHistory array in user object (frontend only)
      return {
        ...state,
        user: {
          ...state.user,
          jobsHistory: state.user && Array.isArray(state.user.jobsHistory)
            ? [action.payload, ...state.user.jobsHistory]
            : [action.payload]
        }
      };
    default:
      return state;
  }
};

// logout reducer
export const userReducerLogout = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { loading: true, userInfo: null, isAuthenticated: false };
    case USER_LOGOUT_SUCCESS:
      return { loading: false, userInfo: null, isAuthenticated: false };
    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        userInfo: null,
        error: action.payload,
        isAuthenticated: false,
      };
    case USER_LOGOUT_RESET:
      return {};
    default:
      return state;
  }
};
