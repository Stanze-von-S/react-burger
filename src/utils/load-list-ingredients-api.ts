
const url = 'https://norma.nomoreparties.space/api/ingredients';

// const getRespose = (res: any) => {
//   if (res.ok) {
//     return res.json();    
//   }
//   return Promise.reject(`Ошибка ${res.status}`)
// }
// .then((data: any) => {console.log(data.data);
// return data.data
// };

export const loadListIngredientsApi = () => {
  return fetch(url)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.statusText});
    }`)
  }).then(data => data.data)
};
