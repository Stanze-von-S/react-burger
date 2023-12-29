import { reducer as ingredientsListReducer } from './burger-ingredients/reducer';
import { reducer as ingredientsConstructorReducer } from './burger-constructor/reducer';
import { reducer as ingredientDetailsReducer } from './ingredient-details/reducer';
import { reducer as orderDetailsReducer } from './order-details/reducer';
import { reducer as counterIngredientsReducer } from './counter-ingredients/reducer';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
  burgerIngredients: ingredientsListReducer,
  burgerConstructor: ingredientsConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  countersIngredients: counterIngredientsReducer,
});
