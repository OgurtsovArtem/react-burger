import { initialState, ingredientsReducer } from './ingredients';
import { ingredients, ingredient } from "../../utils/mock";
import { 
  GET_ALL_INGREDIENTS_REQUEST, 
  GET_ALL_INGREDIENTS_SUCCESS, 
  GET_ALL_INGREDIENTS_FAILED, 
  SET_DETAIL_INGREDIENTS, 
  DELETE_DETAIL_INGREDIENTS, 
  ADD_ITEM, DELETE_ITEM, 
  INCREASE_ITEM, 
  DECREASE_ITEM, 
  CHANGE_ITEM, 
  ADD_BUN 
} from "../action-types";

const state = {...initialState, allIngredients: [ingredient], addedIngredients: [ingredient] }
describe('Ingredients reducer', () => {

  it('Проверка начального состояния', () => {
      const result = ingredientsReducer(state, {});
      expect(result).toEqual(state)
  });
  it('Запрос ингредиентов', () => {
      const result = ingredientsReducer(initialState, { type: GET_ALL_INGREDIENTS_REQUEST });
      expect(result).toEqual({ ...initialState, allIngredientsRequest: true, allIngredientsFailed: false, })
  });
  it('Ошибка запроса ингредиентов', () => {
      const result = ingredientsReducer(initialState, { type: GET_ALL_INGREDIENTS_FAILED });
      expect(result).toEqual({ ...initialState, allIngredientsFailed: true, allIngredientsRequest: false, })
  });
  it('Успешный запрос ингредиентов', () => {
      const result = ingredientsReducer(initialState, { type: GET_ALL_INGREDIENTS_SUCCESS, data: ingredients });
      expect(result).toEqual({ ...initialState, allIngredients: ingredients, allIngredientsRequest: false, })
  });
  it('Добавить детальный ингредиент', () => {
    const result = ingredientsReducer({...initialState, allIngredients: [ingredient] }, { type: SET_DETAIL_INGREDIENTS, _id: ingredient._id });
    expect(result).toEqual({ ...initialState, detailIngredients: ingredient, allIngredients: [ingredient] })
  });
  it('Убрать детальный ингредиент', () => {
    const result = ingredientsReducer(initialState, { type: DELETE_DETAIL_INGREDIENTS });
    expect(result).toEqual({ ...initialState, detailIngredients: null })
  });
  it('Увеличить счетчик', () => {
    const result = ingredientsReducer({...initialState, allIngredients: [ingredient] }, { type: INCREASE_ITEM, id: ingredient._id });
    expect(result).toEqual({ ...initialState, allIngredients: [{...ingredient, qty: 1} ]})
  });
  it('Уменьшить счетчик', () => {
    const result = ingredientsReducer({...initialState, allIngredients: [ingredient] }, { type: DECREASE_ITEM, id: ingredient._id });
    expect(result).toEqual({ ...initialState, allIngredients:  [{...ingredient, qty: 0}] })
  });
  it('Убрать ингредиент', () => {
    const result = ingredientsReducer({...initialState, addedIngredients: [ingredient]}, { type: DELETE_ITEM, id: ingredient._id });
    expect(result).toEqual({ ...initialState, addedIngredients: [] })
  });
  it('Добавить ингредиент', () => {
    const result = ingredientsReducer({...initialState, allIngredients: [ingredient], addedIngredients: [ingredient]}, { type: ADD_ITEM, id: ingredient._id, index: ingredient.order, uniqId: ingredient.uniqId });
    expect(result).toEqual({ ...initialState, addedIngredients: [ingredient, ingredient], allIngredients: [ingredient] })
  });
  it('Добавить булку', () => {
    const result = ingredientsReducer({...initialState, allIngredients: [ingredient] }, { type: ADD_BUN,  id: ingredient._id });
    expect(result).toEqual({ ...initialState, bun: [ingredient], allIngredients: [ingredient] })
  });
  it('Сменить порядок ингредиентов', () => {
    const result = ingredientsReducer({...initialState, addedIngredients: [ingredient]}, { type: CHANGE_ITEM, dragId: ingredient._id, hoverIndex: ingredient.order, hoverId: ingredient._id, dragIndex: ingredient.order });
    expect(result).toEqual({ ...initialState, addedIngredients: [ingredient] })
  });
})