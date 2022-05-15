import { MAIN_URL } from '../../utils/rootConstants';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const CLEAR_ORDER = 'CLEAR_ORDER';

const body= { 
  "ingredients": ["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733c6"]
} 

export function getOrder() {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch(`${MAIN_URL}/orders`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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