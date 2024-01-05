import { chechResponse } from './functions';
const apiUrl = 'https://norma.nomoreparties.space/api';
const loadIngredientsUrl = `${apiUrl}/ingredients`;
const loadOrderUrl = `${apiUrl}/orders`;

export const loadListIngredientsApi = () => {
  return fetch(loadIngredientsUrl)
  .then(chechResponse)
  .then(data => data.data)
};

export const loadOrderApi = (ingredients: string[]) => {
  return fetch(loadOrderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ingredients}),
  })
  .then(chechResponse)
  .then(data => data.order.number);
}
