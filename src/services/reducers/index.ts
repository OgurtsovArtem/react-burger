import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { userReducer } from './user';
import { constructorBurgerReducer } from "./constructor";
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorBurgerReducer,
  user: userReducer,
  ws: wsReducer
});