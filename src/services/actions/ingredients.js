import { MAIN_URL } from '../../utils/rootConstants';

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_FAILED';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const SET_DETAIL_INGREDIENTS = 'SET_DETAIL_INGREDIENTS';
export const DELETE_DETAIL_INGREDIENTS = 'DELETE_DETAIL_INGREDIENTS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DECREASE_ITEM = 'DECREASE_ITEM';
export const INCREASE_ITEM = 'INCREASE_ITEM';
export const ADD_BUN = 'ADD_BUN';
export const CHANGE_ITEM = 'CHANGE_ITEM'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST
    });
    fetch(`${MAIN_URL}/ingredients`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          data: data.data
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED
        });
      });
  }
}