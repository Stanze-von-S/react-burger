import { IStore } from "../../types/burgersTypes"
export const bun = (store: IStore) => store.burgerConstructor.bun;
export const ingredients = (store: IStore) => store.burgerConstructor.ingredients;