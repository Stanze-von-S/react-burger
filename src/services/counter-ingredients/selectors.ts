import { IStore } from "../../types/burgersTypes";

export const ingredientsCounter = (store: IStore) => store.countersIngredients.ingredients;
export const bunsCounter = (store: IStore) => store.countersIngredients.buns;
