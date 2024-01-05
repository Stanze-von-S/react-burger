import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { IStore } from '../types/burgersTypes';
import { IBurgerIngredientsState, IBurgerConstructorState, IIngredientDetailState, IOrderDetails } from '../types/burgersTypes';
import { reducer } from './reducer';

export const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
}