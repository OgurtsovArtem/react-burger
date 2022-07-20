import { IIngredientsPropTypes } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import { 
  GET_ALL_INGREDIENTS_REQUEST, 
  GET_ALL_INGREDIENTS_SUCCESS, 
  GET_ALL_INGREDIENTS_FAILED, 
  SET_DETAIL_INGREDIENTS, 
  DELETE_DETAIL_INGREDIENTS, 
  DECREASE_ITEM, 
  INCREASE_ITEM, 
  DELETE_ITEM, 
  ADD_ITEM, 
  CHANGE_ITEM, 
  ADD_BUN 
} from "../action-types";



type TIngredientsState = {
  allIngredients: IIngredientsPropTypes[];
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;

  addedIngredients: IIngredientsPropTypes[];
  detailIngredients: IIngredientsPropTypes | null | undefined;
  bun : IIngredientsPropTypes[];
} 

export const initialState: TIngredientsState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  addedIngredients: [],
  detailIngredients: null,
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
        detailIngredients: null,
      };
    }

    case DECREASE_ITEM: {
      return {
        ...state,
        allIngredients: state.allIngredients.map((item) =>
          item._id === action.id ? { ...item, qty: --item.qty || 0 } : item
        ),
      };
    }
    case INCREASE_ITEM: {
      return {
        ...state,
        allIngredients: state.allIngredients.map((item) =>
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
            .map((item):any => {
              if (item._id === action.id) {
                return { ...item, order: action.index, uniqId: action.uniqId };
              }
              return false
            })
            .filter((item) => item !== false),
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
        bun: [...state.allIngredients.filter((item) => item._id === action.id)],
        allIngredients: state.allIngredients.map((item) => {
          if (item.type === "bun") {
            return item._id === action.id ? { ...item, qty: 2 } : { ...item, qty: 0 };
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
