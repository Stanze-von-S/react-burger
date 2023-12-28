const apiUrl = 'https://norma.nomoreparties.space/api';
const loadIngredientsUrl = `${apiUrl}/ingredients`;
const loadOrderUrl = `${apiUrl}/orders`;

export const loadListIngredientsApi = () => {
  return fetch(loadIngredientsUrl)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.statusText}`)
  }).then(data => data.data)
};

export const loadOrderApi = (ingredients: string[]) => {
  return fetch(loadOrderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ingredients}),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.statusText}`)
  }).then(data => data.order.number);
}
