import { registerUser, login, logout, getUser, updateUser } from "../../utils/api";
import { AppDispatch, IFormDataTypes, IIngredientsPropTypes, IUserTypes } from "../../utils/types";
import { deleteCookie, setCookie } from "../../utils/utils";
import { 
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  AUTH_CHECKED,
  GET_USER_FAILED, 
  LOGIN_USER_REQUEST, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAILED, 
  USER_LOGOUT, 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_FAILED, 
  UPDATE_USER_REQUEST, 
  UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAILED 
} from "../action-types";

export function checkUserAuth() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data: data.user,
          });
          dispatch({
            type: AUTH_CHECKED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
          error: err,
        });
      });
  };
}

export function signIn(formData: IFormDataTypes) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    login(formData)
      .then((data) => {
        console.log(data);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          data: data,
        });
        setCookie("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_USER_FAILED,
          error: err,
        });
      });
  };
}

export function signOut() {
  return function (dispatch: AppDispatch) {
    logout().then((data) => {
      dispatch({
        type: USER_LOGOUT,
        data: data,
      });
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
    });
  };
}

export function register(formData: IFormDataTypes) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    registerUser(formData)
      .then((data) => {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          data: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          error: err,
        });
      });
  };
}

export function update(formData: IFormDataTypes) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUser(formData)
      .then((data) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          data: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          error: err,
        });
      });
  };
}


export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
}
export interface IUserLogoutAction {
  readonly type: typeof USER_LOGOUT;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly error: string;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly data: IUserTypes;
}
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly error: string;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly data: IUserTypes;
}
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  readonly error: string;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly data: IIngredientsPropTypes;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly error: string;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly data: IIngredientsPropTypes;
}

export type TUserActions = 
    | IAuthCheckedAction
    | IUserLogoutAction
    | ILoginUserRequestAction
    | ILoginUserFailedAction
    | ILoginUserSuccessAction
    | IRegisterUserRequestAction
    | IRegisterUserFailedAction
    | IRegisterUserSuccessAction
    | IGetUserRequestAction
    | IGetUserFailedAction
    | IGetUserSuccessAction
    | IUpdateUserRequestAction
    | IUpdateUserFailedAction
    | IUpdateUserSuccessAction;