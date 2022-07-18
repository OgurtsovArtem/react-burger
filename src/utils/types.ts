import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store";
import { TConstructorActions } from "../services/actions/constructor";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TUserActions } from "../services/actions/user";
import { TWsActions } from "../services/actions/wsActions";
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_ALL_ORDERS, WS_CONNECTION_USER_START } from "../services/action-types";

export interface IIngredientsPropTypes {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  uniqId: string;
  qty: number ;
  order: number;
}

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: Array<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}
export interface IOrders<T> {
  readonly orders: Array<T>;
  readonly success: boolean
  readonly total: number
  readonly totalToday: number
}
export interface IFormDataTypes {
  readonly email?: string;
  readonly name?: string;
  readonly password?: string;
  readonly token?: string;
}

export interface IUserTypes {
  readonly user?: {name: string, email: string};
  readonly email?: string;
  readonly name?: string;
  readonly token?: string;
}

export type TWsMiddlewareActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsUserInit: typeof WS_CONNECTION_USER_START,
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ALL_ORDERS;
};

export type TApplicationActions = TConstructorActions | TUserActions | TIngredientsActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
  >;

