import { IOrder, IOrders } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_USER_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS,
} from '../action-types';

export interface  wsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
};
export interface  wsConnectionUserStart {
  readonly type: typeof WS_CONNECTION_USER_START;
};

export interface  wsConnectionSuccess  {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export interface wsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export interface wsConnectionClosed  {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export interface wsUserConnectionClosed  {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
};

export interface wsGetAllOrders{
    readonly type: typeof WS_GET_ALL_ORDERS;
    readonly payload: IOrders<IOrder>;
};


export const WsConnectionStart = (): wsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const WsConnectionUserStart = (): wsConnectionUserStart => ({
  type: WS_CONNECTION_USER_START,
});

export const WsConnectionClose = (): wsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export type TWsActions = 
    | wsConnectionStart
    | wsConnectionUserStart
    | wsConnectionSuccess
    | wsConnectionError
    | wsConnectionClosed
    | wsUserConnectionClosed
    | wsGetAllOrders;