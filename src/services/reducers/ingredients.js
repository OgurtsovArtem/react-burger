import {
  GET_ALL_INGREDIENTS_REQUEST,
  GET_ALL_INGREDIENTS_FAILED,
  GET_ALL_INGREDIENTS_SUCCESS,
  SET_DETAIL_INGREDIENTS,
  DETAIL_INGREDIENTS_REQUEST,
  DETAIL_INGREDIENTS_FAILED,
  DELETE_DETAIL_INGREDIENTS,
  ADD_ITEM,
  DELETE_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  ADD_BUN,
  CHANGE_ITEM
} from '../actions/ingredients';

const initialState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,

  addedIngredients: [],
  detailIngredients: null,
  detailIngredientsRequest: false,
  detailIngredientsFailed: false,

  bun: [],
}

export const ingredientsReducer = (state = initialState, action) => {
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
      allIngredientsRequest: false 
    };
  }
  case GET_ALL_INGREDIENTS_FAILED: {
    return { 
      ...state, 
      allIngredientsFailed: true, 
      allIngredientsRequest: false 
    };
  }
  case SET_DETAIL_INGREDIENTS: {
    return { 
      ...state, 
      detailIngredients: action.data.find(item => item._id === action._id),
      detailIngredientsRequest: false,
    };
  }
  case DELETE_DETAIL_INGREDIENTS: {
    return { 
      ...state, 
      detailIngredients: {},
    };
  }
  case DETAIL_INGREDIENTS_REQUEST: {
    return { 
      ...state, 
      detailIngredientsRequest: true,
      detailIngredientsFailed: false,
    };
  }
  case DETAIL_INGREDIENTS_FAILED: {
    return { 
      ...state, 
      detailIngredientsFailed: true, 
      detailIngredientsRequest: false 
    };
  }
  case DECREASE_ITEM: {
    return { 
      ...state,
       allIngredients: state.allIngredients.map(item =>
        item._id === action.id ? {...item, qty: --item.qty || 0} : item
    ) };
  }
  case INCREASE_ITEM: {
    return { 
      ...state,
       allIngredients: state.allIngredients.map(item =>
        item._id === action.id ? {...item, qty: ++item.qty || 1} : item
    ) 
  };
  }
  case DELETE_ITEM: {
    return { 
      ...state,
      addedIngredients: [...state.addedIngredients].filter(item => item.uniqId !== action.id )
      };
  }
  // case SET_ORDER: {

  // }
  case ADD_ITEM: {
    return {
      ...state,
      addedIngredients: [...state.addedIngredients, ...state.allIngredients.map(item => {
        if (item._id === action.id) {
         return {...item, order: action.index, uniqId: action.uniqId}
        }
        return false
      }).filter(item => item !== false)],
    };
  } 
  case CHANGE_ITEM: {
    return {
      ...state,
      addedIngredients: state.addedIngredients.map(item =>{
       if (item.uniqId === action.dragId) {
        return {...item, order: action.hoverIndex}
       } 
       if (item.uniqId === action.hoverId) {
        return {...item, order: action.dragIndex}
      } 
      return item;
      }).sort((prev, next) => prev.order > next.order ? 1 : -1)
    };
  } 

  case ADD_BUN: {
    return {
      ...state,
      bun: [...state.allIngredients.filter(item => item._id === action.id)],
    };
  }
    default: {
        return state
    }
  }
  
} 