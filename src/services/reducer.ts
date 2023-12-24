import { reducer as ingredientsListReducer } from './burger-ingredients/reducer';
import { reducer as ingredientsConstructorReducer } from './burger-constructor/reducer';
import { reducer as ingredientDetailsReducer } from './ingredient-details/reducer';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
  burgerIngredients: ingredientsListReducer,
  burgerConstructor: ingredientsConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
});
