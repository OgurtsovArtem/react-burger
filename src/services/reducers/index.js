import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.js';
import { userReducer } from './user.js';
import { constructorBurgerReducer } from "./constructor";


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorBurgerReducer,
  user: userReducer,
});