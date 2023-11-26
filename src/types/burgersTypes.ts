
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

export type IBurgerList = Array<IBurgerCard>;