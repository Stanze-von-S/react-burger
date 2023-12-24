import { IBurgerConstructorState, IIngredientCard } from '../../types/burgersTypes';
// import { ADD_INGREDIENT } from './actions';

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
