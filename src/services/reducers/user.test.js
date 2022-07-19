import { initialState, userReducer } from './user';
import { user, userError } from "../../utils/mock";
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
  UPDATE_USER_SUCCESS
} from '../action-types'

describe('User', () => {

    it('Проверка начального состояния', () => {
        const result = userReducer(initialState, {});
        expect(result).toEqual(initialState)
    });
    it('Проверка авторизован ли пользователь', () => {
        const result = userReducer(initialState, { type: AUTH_CHECKED });
        expect(result).toEqual({ ...initialState, isAuthCheck: true })
    });
    it('Запрос на вход пользователя', () => {
        const result = userReducer(initialState, { type: LOGIN_USER_REQUEST });
        expect(result).toEqual({ ...initialState, loginUserRequest: true, loginUserFailed: null, sending: true })
    });
    it('Ошбка запроса на вход пользователя', () => {
        const result = userReducer(initialState, { type: LOGIN_USER_FAILED, error: userError });
        expect(result).toEqual({ ...initialState, loginUserRequest: false, loginUserFailed: userError,  sending: false })
    });
    it('Успешный запрос на вход пользоваетля', () => {
        const result = userReducer(initialState, { type: LOGIN_USER_SUCCESS, data: user });
        expect(result).toEqual({ ...initialState, loginUserRequest: false, data: user, isAuthCheck: true, sending: false, })
    });
    it('Запрос на регистрацию', () => {
        const result = userReducer(initialState, { type: REGISTER_USER_REQUEST });
        expect(result).toEqual({ ...initialState, registerUserRequest: true, registerUserFailed: null, sending: true, })
    });
    it('Ошибка запроса на регистрацию', () => {
        const result = userReducer(initialState, { type: REGISTER_USER_FAILED, error: userError });
        expect(result).toEqual({ ...initialState, registerUserRequest: false, registerUserFailed: userError, sending: false })
    });
    it('Успешный запрос на регистрацию', () => {
        const result = userReducer(initialState, { type: REGISTER_USER_SUCCESS, data: user });
        expect(result).toEqual({ ...initialState, registerUserRequest: false, sending: false })
    });
    it('Получение пользователя', () => {
        const result = userReducer(initialState, { type: GET_USER_REQUEST });
        expect(result).toEqual({ ...initialState, getUserRequest: true, getUserFailed: null, sending: true })
    });
    it('Ошибка получение пользователя', () => {
        const result = userReducer(initialState, { type: GET_USER_FAILED, error: userError });
        expect(result).toEqual({ ...initialState, getUserRequest: false, getUserFailed: userError, sending: false })
    });
    it('Успешное получение пользователя', () => {
        const result = userReducer(initialState, { type: GET_USER_SUCCESS, data: user });
        expect(result).toEqual({ ...initialState, getUserRequest: false, data: user, isAuthCheck: true, sending: false })
    });
    it('Обновление пользователя', () => {
        const result = userReducer(initialState, { type: UPDATE_USER_REQUEST });
        expect(result).toEqual({ ...initialState, updateUserRequest: true, updateUserFailed: null, sending: true })
    });
    it('Ошибка обновления пользователя', () => {
        const result = userReducer(initialState, { type: UPDATE_USER_FAILED, error: userError });
        expect(result).toEqual({ ...initialState, updateUserRequest: false, updateUserFailed: userError, sending: false })
    });
    it('Успешное обновление пользователя', () => {
        const result = userReducer(initialState, { type: UPDATE_USER_SUCCESS, data: user });
        expect(result).toEqual({ ...initialState, updateUserRequest: false, data: user, sending: false })
    });

    it('Выход из личного кабинета', () => {
        const result = userReducer(initialState, { type: USER_LOGOUT });
        expect(result).toEqual({ ...initialState, data: null, isAuthCheck: false, })
    });
})