import { IUserTypes } from '../../utils/types';
import {
  AUTH_CHECKED,
  USER_LOGOUT,

  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,

  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,

  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,

  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  TUserActions,
} from '../actions/user';


type TUserState = {
  isAuthCheck: boolean,

  sending: boolean,

  data:  null | IUserTypes,

  loginUserFailed: null | string,
  loginUserRequest: boolean,

  registerUserFailed: null | string,
  registerUserRequest: boolean,

  getUserFailed: null | string,
  getUserRequest: boolean,

  updateUserFailed: null | string,
  updateUserRequest: boolean,
} 

const initialState: TUserState = {
  isAuthCheck: false,

  sending: false,

  data: null,

  loginUserFailed: null,
  loginUserRequest: false,

  registerUserFailed: null,
  registerUserRequest: false,

  getUserFailed: null,
  getUserRequest: false,

  updateUserFailed: null,
  updateUserRequest: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
switch (action.type) {
  case AUTH_CHECKED: {
    return {
      ...state,
      isAuthCheck: true,
    };
  }
  case USER_LOGOUT: {
    return {
      ...state,
      data: null,
      isAuthCheck: false,
    };
  }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        loginUserFailed: null,
        sending: true,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: action.error,
        sending: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginUserRequest: false,
        data: action.data,
        isAuthCheck: true,
        sending: false,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserFailed: null,
        sending: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: action.error,
        sending: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        sending: false,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: null,
        sending: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: action.error,
        sending: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        data: action.data,
        isAuthCheck: true,
        sending: false,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: null,
        sending: true,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: action.error,
        sending: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        data: action.data,
        sending: false,
      };
    }
    default: {
        return state
    }
  }
} 