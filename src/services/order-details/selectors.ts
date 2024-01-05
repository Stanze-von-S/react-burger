import { IStore } from "../../types/burgersTypes";

export const ingredientsOrder = (store: IStore) => store.orderDetails.ingredients;
export const orderIndex = (store: IStore) => store.orderDetails.orderId;
export const orderLoading = (store: IStore) => store.orderDetails.loading;
export const orderError = (store: IStore) => store.orderDetails.error;