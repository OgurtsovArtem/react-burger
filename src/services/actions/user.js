import { registerUser, login, logout, getUser, updateUser,} from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/utils";

export const AUTH_CHECKED = 'UPDATE_USER_REQUEST';
export const USER_LOGOUT = 'UPDATE_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';


export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export function checkUserAuth() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    getUser().then((data) => {
      if(data.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          data: data.user
        });
        dispatch({
          type: AUTH_CHECKED
        });
      }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_USER_FAILED,
          error: err
        });
      });
  }
}

export function signIn(formData) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    login(formData).then((data) => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: data
        });
        setCookie("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          error: err
        });
      });
  }
}
export function signOut() {
  return function(dispatch) {
    logout().then((data) => {
        dispatch({
          type: USER_LOGOUT,
          data: data
        });
        deleteCookie("accessToken")
        localStorage.removeItem("refreshToken", data.refreshToken);
      })
  }
}

export function register(formData) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    registerUser(formData).then((data) => {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: data
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          error: err
        });
      });
  }
}


export function update(formData) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    updateUser(formData).then((data) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          data: data
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          error: err
        });
      });
  }
}