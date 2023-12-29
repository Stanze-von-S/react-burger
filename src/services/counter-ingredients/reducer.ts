import type { IState, IPayload } from '../../types/burgersTypes';
import { INCREMENTS_INGREDIENT, DECREMENTS_INGREDIENT, INCREMENTS_BUNS, RESET_COUNTERS } from './actions';

const initialState: IState = {
  ingredients: new Map<string, number>(),
  buns: new Map<string, number>(),
};

export const reducer = (state: IState, action: IPayload) => {
  switch (action.type) {
    case INCREMENTS_INGREDIENT: {
      if (state.ingredients.has(action.payload)) {
        state.ingredients.set(action.payload, state.ingredients.get(action.payload)! + 1);
      } else {
        state.ingredients.set(action.payload, 1);
      }
      return { ...state, ingredients: new Map(state.ingredients) };
    }
    case DECREMENTS_INGREDIENT: {
      state.ingredients.set(action.payload, state.ingredients.get(action.payload)! - 1);
      if (state.ingredients.get(action.payload) === 0) {
        state.ingredients.delete(action.payload);
      }
      return { ...state, ingredients: new Map(state.ingredients) };
    }
    case INCREMENTS_BUNS: {
      if (state.buns.size === 0) {
        state.buns.set(action.payload, 2);
      } else {
        state.buns.clear();
        state.buns.set(action.payload, 2);
      }
      return { ...state, buns: new Map(state.buns) };
    }
    case RESET_COUNTERS: {
      return { buns: new Map(), ingredients: new Map() };
    }
    default:
      return initialState;
  }
};
