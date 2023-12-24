import { IBurgerConstructorState, IIngredientCard } from '../../types/burgersTypes';
import { v4 as uuidv4 } from 'uuid';
import { ADD_BUN, ADD_INGREDIENT, DRAG_INGREDIENT } from './actions';

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const length = state.ingredients.length;
      const ingredient = { ...action.payload, ingredientId: uuidv4(), index: length };
      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
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
      // const list = 
      // console.log(action.payload.dragIndex, 'dragIndex');
      // console.log(action.payload.hoverIndex, 'hoverIndex');
      // if(action.payload.dragIndex) {
      //   console.log(state.ingredients.splice(action.payload.dragIndex, 1), 'splice in begin', action.payload.dragIndex);

      // }
      // return state;
      if (!action.payload.dragIndex || !action.payload.hoverIndex) {
        console.log('if');
        return state;
      } else {
        console.log(state);
        console.log(action.payload.dragIndex, 'dragIndex');
        console.log(action.payload.hoverIndex, 'hoverIndex');
        const list = state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]);
        console.log(list, 'list');
        // return state;
        return {
          ...state,
          ingredients: state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]),
        };
      }
    }
    default: {
      return state;
    }
  }
};
