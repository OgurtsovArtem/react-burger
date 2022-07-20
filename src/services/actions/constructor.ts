import { MAIN_URL } from '../../utils/rootConstants';
import { AppDispatch, IIngredientsPropTypes } from '../../utils/types';
import { getCookie } from '../../utils/utils';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../action-types';

export function getOrder(ingredientsArr: string[]): any {
  const token = getCookie('accessToken');
  if (!token) {
    console.error("token nof found")
    return
  }
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch(`${MAIN_URL}/orders/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ingredients: ingredientsArr})
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          data: data
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      });
  }
}

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly data: IIngredientsPropTypes;
}
export interface IClearOrderAction {
  readonly type: typeof CLEAR_ORDER;
}

export type TConstructorActions = 
    | IGetOrderRequestAction
    | IGetOrderFailedAction
    | IGetOrderSuccessAction
    | IClearOrderAction;