import { createSelector } from 'reselect';
import { IStore } from "../../types/burgersTypes";
export const burgerIngredients = (store: IStore) => store.burgerIngredients.ingredients;
export const ingredientsError = (store: IStore) => store.burgerIngredients.error;
export const ingredientsLoading = (store: IStore) => store.burgerIngredients.loading;
export const buns = createSelector((store: IStore) => store.burgerIngredients.ingredients, ingredients => ingredients.filter(ingredient => ingredient.type === 'bun'));
export const sauces = createSelector((store: IStore) => store.burgerIngredients.ingredients, ingredients => ingredients.filter(ingredient => ingredient.type === 'sauce'));
export const mains = createSelector((store: IStore) => store.burgerIngredients.ingredients, ingredients => ingredients.filter(ingredient => ingredient.type === 'main'));