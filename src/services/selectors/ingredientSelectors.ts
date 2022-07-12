import { MAIN_URL } from "../../utils/rootConstants"
import { AppDispatch, AppThunk, IIngredientsPropTypes, RootState } from "../../utils/types"
import { WS_GET_ALL_ORDERS } from "../action-types"

export const getIngredientId = (state: RootState, id: string | null):IIngredientsPropTypes => {
  return state.ingredients.allIngredients.filter((item: { _id: string | null }) => item._id === id)[0]
}

export const getFeedId = (state: any, id: string | null):any => {
  return state.ws.data.orders.filter((item: { _id: string | null }) => item._id === id)[0]
}

export const getAllMobileImages = (state: RootState, ingredients: string[]): string[] => {
  return ingredients.map((item: string) => getIngredientId(state, item).image_mobile)
}
export const getAllNames = (state: RootState, ingredients: string[]): string[] => {
  return ingredients.map((item: string) => getIngredientId(state, item).name)
}
export const getAllPrice = (state: RootState, ingredients: string[]): number[] => {
  return ingredients.map((item: string) => getIngredientId(state, item).price)
}


export const getFinalPrice = (state: RootState, ingredients: string[]): number => {
  return ingredients.reduce((prev: number, next: any) => prev + getIngredientId(state, next).price, 0)
}


export const getOrdersFeed = () => (dispatch: AppDispatch) => {
  return fetch(`${MAIN_URL}/orders/all`)
      .then((response) => {
          if (!response.ok) {
              throw Promise.reject(response)
          }
          return response.json();
      })
      .then((data) => {
          dispatch({ type: WS_GET_ALL_ORDERS, payload: data });
      })
      .catch((err) => {
          console.log(err);
      });
};

export const detailIngredientsHandler = (state: RootState, id: string | null) => {
  const {data}: any = state.ws;
  if (data) {
    const feedObject = getFeedId(state, id);
    createFeedObject(state, feedObject)
  } 
  else {
  }
}



const createFeedObject = (state: RootState, object: any) => {
  object.cardInfo = {};
  object.cardInfo.images = getAllMobileImages(state, object.ingredients);
  object.cardInfo.names = getAllNames(state, object.ingredients);
  object.cardInfo.prices = getAllPrice(state, object.ingredients);
  console.log(object)
}