import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware';
import thunkMiddleware from 'redux-thunk';
import { WS_ORDER_URL } from '../utils/rootConstants';

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware,socketMiddleware(`${WS_ORDER_URL}`)))
  );
  
export const store = initStore();