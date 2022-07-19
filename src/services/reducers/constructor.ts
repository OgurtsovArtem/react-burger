import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../action-types';
import { TConstructorActions } from '../actions/constructor';

type TConstructorListState = {
  orderStatus: any;
  orderRequest: boolean;
  orderLoader: boolean;
  orderFailed: boolean;
} 

export const initialState: TConstructorListState = {
  orderStatus: {},
  orderRequest: true,
  orderLoader: true,
  orderFailed: false,
}

export const constructorBurgerReducer = (state = initialState, action: TConstructorActions): TConstructorListState => {
switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return { 
        ...state,
        orderStatus: action.data, 
        orderRequest: false,
        orderLoader: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { 
        ...state, 
        orderFailed: true, 
        orderRequest: false,
        orderLoader: false,
      };
    }
    case CLEAR_ORDER: {
      return { 
        ...state, 
        orderStatus: {}, 
        orderLoader: true,
      };
    }
    default: {
        return state
    }
  }
} 