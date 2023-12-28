import { IBurgerConstructorState } from '../../types/burgersTypes';
import { v4 as uuidv4 } from 'uuid';
import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, DRAG_INGREDIENT, RESET_INGREDIENTS } from './actions';

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const ingredient = { ...action.payload, ingredientId: uuidv4() };
      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.ingredientId !== action.payload),
      };
    }
    case ADD_BUN: {
      const ingredient = { ...action.payload, ingredientId: uuidv4() };
      return {
        ...state,
        bun: ingredient,
      };
    }
    case DRAG_INGREDIENT: {
      if (action.payload.dragIndex === undefined || action.payload.hoverIndex === undefined) {
        return state;
      } else {
        state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]);
        return {
          ...state,
          ingredients: [...state.ingredients],
        };
      }
    }
    case RESET_INGREDIENTS: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
