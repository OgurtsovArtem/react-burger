import { IOrder, IOrders } from '../../utils/types';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS
} from '../action-types';
import { TWsActions } from '../actions/wsActions';


type TWsState = {
  wsConnected: boolean,
  data:  IOrders<IOrder> | null,
}

export const initialState: TWsState = {
  wsConnected: false,
  data: null,
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        data: null
      };

    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};