import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import thunkMiddleware from 'redux-thunk';
import { WS_ORDER_URL } from '../utils/rootConstants';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_USER_START, WS_GET_ALL_ORDERS } from './action-types';
import { TWsMiddlewareActions } from '../utils/types';

const wsActions: TWsMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsUserInit: WS_CONNECTION_USER_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_ORDERS
};

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware,socketMiddleware(`${WS_ORDER_URL}`, wsActions, `/all`)))
  );
  
export const store = initStore();