import { MAIN_URL } from "../../utils/rootConstants";
import { AppDispatch, IIngredientsPropTypes } from "../../utils/types";
import { 
  GET_ALL_INGREDIENTS_REQUEST, 
  GET_ALL_INGREDIENTS_SUCCESS, 
  GET_ALL_INGREDIENTS_FAILED, 
  SET_DETAIL_INGREDIENTS, 
  DELETE_DETAIL_INGREDIENTS, 
  DETAIL_INGREDIENTS_REQUEST, 
  DETAIL_INGREDIENTS_FAILED, 
  ADD_ITEM, DELETE_ITEM, 
  INCREASE_ITEM, 
  DECREASE_ITEM, 
  CHANGE_ITEM, 
  ADD_BUN 
} from "../action-types";



export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
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
          data: data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ALL_INGREDIENTS_FAILED,
        });
      });
  };
}

export interface IGetAllRequestAction {
  readonly type: typeof GET_ALL_INGREDIENTS_REQUEST;
}
export interface IGetAllFailedAction {
  readonly type: typeof GET_ALL_INGREDIENTS_FAILED;
}

export interface IGetAllSuccessAction {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
  readonly data: IIngredientsPropTypes[];
}
export interface ISetDetailAction {
  readonly type: typeof SET_DETAIL_INGREDIENTS;
  readonly _id: string;
}
export interface IDeleteDetailAction {
  readonly type: typeof DELETE_DETAIL_INGREDIENTS;
}
export interface IDetailIngredientsRequestAction {
  readonly type: typeof DETAIL_INGREDIENTS_REQUEST;
}
export interface IDetailIngredientsFailedAction {
  readonly type: typeof DETAIL_INGREDIENTS_FAILED;
}
export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly id: string;
  readonly uniqId: string;
  readonly index: number;
}
export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly id: string;
}

export interface IIncreaseItemAction {
  readonly type: typeof INCREASE_ITEM;
  readonly id: string;
}
export interface IDecreaseItemAction {
  readonly type: typeof DECREASE_ITEM;
  readonly id: string;
}
export interface IChangeItemAction {
  readonly type: typeof CHANGE_ITEM;
  readonly dragId: string;
  readonly hoverId: string;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly id: string;
}

export type TIngredientsActions = 
    | IGetAllRequestAction
    | IGetAllFailedAction
    | IGetAllSuccessAction
    | ISetDetailAction
    | IDeleteDetailAction
    | IDetailIngredientsRequestAction
    | IDetailIngredientsFailedAction
    | IAddItemAction
    | IDeleteItemAction
    | IIncreaseItemAction
    | IDecreaseItemAction
    | IChangeItemAction
    | IAddBunAction;