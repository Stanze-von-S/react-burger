export enum burgersTypes {
  'bun',
  'main',
  'sauce'
};

export type constructorElementTypes = 'top' | 'bottom' | 'undefined';

export interface IBurgerCard {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IBurgerCount {
  _id: string;
  count: number;
}

export type IBurgerCountsList = IBurgerCount[];

export type IBurgerList = Array<IBurgerCard>;

export interface IBurgerIngredientsState {
  ingredients: IBurgerCard[];
  loading: boolean;
  error: string | null;
  
}

export interface IIngredientCard extends IBurgerCard {
  ingredientId: string;
  index: number;

}

export interface IBurgerConstructorState {
  bun: IIngredientCard | null;
  ingredients: IIngredientCard[];
}

export interface IIngredientDetailState {
  ingredient: IIngredientCard | null;
}

export interface IOrderDetails {
  ingredients: IIngredientCard[];
}

export const IngredientsItemTypes = {
  BUN: 'bun',
  MAIN: 'main',
}


export interface ElementProps {
  id: any;
  text: string;
  index: number;
  moveElement: (dragIndex: string, hoverIndex: string | undefined) => void;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}

export interface Item {
  id: number
  text: string
}

export interface IStore {
  burgerIngredients: IBurgerIngredientsState,
  burgerConstructor: IBurgerConstructorState,
  ingredientDetails: IIngredientDetailState,
  // orderDetail: IOrderDetails,
}