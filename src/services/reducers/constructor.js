import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from '../actions/constructor';

const initialState = {
  orderStatus: {},
  orderRequest: true,
  orderLoader: true,
  orderFailed: false,
}

export const constructorBurgerReducer = (state = initialState, action) => {
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
    
    default: {
        return state
    }
  }
} 