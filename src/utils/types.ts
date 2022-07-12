import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../services/store";
import { TConstructorActions } from "../services/actions/constructor";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TUserActions } from "../services/actions/user";
import { TWsActions } from "../services/actions/wsActions";

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
  qty: number;
  order: number;
}

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}
export interface IOrders<T> {
  readonly orders: ReadonlyArray<T>;
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
  readonly user?: {name: string};
  readonly email?: string;
  readonly name?: string;
  readonly token?: string;
}


export type TApplicationActions = TConstructorActions | TUserActions | TIngredientsActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
  >;

