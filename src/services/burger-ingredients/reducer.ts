import { IBurgerIngredientsState } from '../../types/burgersTypes';
import { LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR, LOAD_INGREDIENTS_PENDING } from './actions';

const initialState: IBurgerIngredientsState = {  
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
      };
    }
    case LOAD_INGREDIENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case LOAD_INGREDIENTS_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
