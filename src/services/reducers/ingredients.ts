import { IIngredientsPropTypes } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_FAILED,
  GET_ALL_INGREDIENTS_SUCCESS,
  SET_DETAIL_INGREDIENTS,
  DELETE_DETAIL_INGREDIENTS,
  ADD_ITEM,
  DELETE_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  ADD_BUN,
  CHANGE_ITEM,
} from "../actions/ingredients";


type TIngredientsState = {
  allIngredients: IIngredientsPropTypes[];
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;

  addedIngredients: IIngredientsPropTypes[];
  detailIngredients: IIngredientsPropTypes[] | any;
  bun : IIngredientsPropTypes[];
} 

const initialState: TIngredientsState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  addedIngredients: [],
  detailIngredients: [],
  bun: [],
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_REQUEST: {
      return {
        ...state,
        allIngredientsRequest: true,
        allIngredientsFailed: false,
      };
    }
    case GET_ALL_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        allIngredients: action.data,
        allIngredientsRequest: false,
      };
    }
    case GET_ALL_INGREDIENTS_FAILED: {
      return {
        ...state,
        allIngredientsFailed: true,
        allIngredientsRequest: false,
      };
    }
    case SET_DETAIL_INGREDIENTS: {
      return {
        ...state,
        detailIngredients:  [...state.allIngredients ].find((item) => item._id === action._id) ,
      };
    }
    case DELETE_DETAIL_INGREDIENTS: {
      return {
        ...state,
        detailIngredients: [],
      };
    }

    case DECREASE_ITEM: {
      return {
        ...state,
        allIngredients: state.allIngredients.map((item: any) =>
          item._id === action.id ? { ...item, qty: --item.qty || 0 } : item
        ),
      };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        allIngredients: state.allIngredients.map((item: any) =>
          item._id === action.id ? { ...item, qty: ++item.qty || 1 } : item
        ),
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        addedIngredients: [...state.addedIngredients].filter((item) => item.uniqId !== action.id),
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        addedIngredients: [
          ...state.addedIngredients,
          ...state.allIngredients
            .map((item: any) => {
              if (item._id === action.id) {
                return { ...item, order: action.index, uniqId: action.uniqId };
              }
              return false;
            })
            .filter((item: any) => item !== false),
        ],
      };
    }
    case CHANGE_ITEM: {
      return {
        ...state,
        addedIngredients: state.addedIngredients
          .map((item: IIngredientsPropTypes) => {
            if (item.uniqId === action.dragId) {
              return { ...item, order: action.hoverIndex };
            }
            if (item.uniqId === action.hoverId) {
              return { ...item, order: action.dragIndex };
            }
            return item;
          })
          .sort((prev: {order: number}, next: {order: number}) => (prev.order > next.order ? 1 : -1)),
      };
    }

    case ADD_BUN: {
      return {
        ...state,
        bun: [...state.allIngredients.filter((item: any) => item._id === action.id)],
        allIngredients: state.allIngredients.map((item: any) => {
          if (item.type === "bun") {
            return item._id === action.id ? { ...item, qty: 2 } : { ...item, qty: null };
          }
          return item;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
