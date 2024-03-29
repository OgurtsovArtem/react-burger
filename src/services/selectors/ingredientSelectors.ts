import { IIngredientsPropTypes, IOrder, RootState } from "../../utils/types"

export const getIngredientId = (state: RootState, id: string | null):IIngredientsPropTypes => {
  return state.ingredients.allIngredients.filter((item: { _id: string | null }) => item._id === id)[0]
}

export const getFeedId = (state: RootState, id: string | null, orders:IOrder[]):IOrder => {
  return orders.filter((item: { _id: string | null }) => item._id === id)[0]
}

export const getAllMobileImages = (state: RootState, ingredients: string[]): string[] => {
  return ingredients.map((item: string) => getIngredientId(state, item)?.image_mobile)
}
export const getAllNames = (state: RootState, ingredients: string[]): string[] => {
  return ingredients.map((item: string) => getIngredientId(state, item)?.name)
}
export const getAllPrice = (state: RootState, ingredients: string[]): number[] => {
  return ingredients.map((item: string) => getIngredientId(state, item)?.price)
}
export const getAllId = (state: RootState, ingredients: string[]): string[] => {
  return ingredients.map((item: string) => getIngredientId(state, item)?._id)
}
export const getFinalPrice = (state: RootState, ingredients: string[]): number => {
  return ingredients.reduce((prev: number, next: string) => prev + getIngredientId(state, next)?.price, 0)
}
export const getRepetitionsNumbers = (state: RootState, ingredients: string[]): string[] => {
  return getAllId(state, ingredients).reduce((acc: any, el:string) => { acc[el] = (acc[el] || 0) + 1; return acc; }, {})
}