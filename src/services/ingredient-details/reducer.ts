import { IIngredientDetailState } from '../../types/burgersTypes';
import { CREATE_INGREDIENT, DROP_INGREDIENT } from './actions';

const initialState: IIngredientDetailState = {
  ingredient: null,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }

    case DROP_INGREDIENT: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}