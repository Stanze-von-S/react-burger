import { loadListIngredientsApi } from '../../utils/load-list-ingredients-api';

export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_PENDING = 'LOAD_INGREDIENTS_PENDING';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR'

export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS'; 

export const loadList = () => (dispatch: any) => {
  dispatch({type: LOAD_INGREDIENTS_PENDING});
  return loadListIngredientsApi().then(res => {
    dispatch({
      type: LOAD_INGREDIENTS_SUCCESS,
      payload: res
    });
  })
  .catch(error => {
    dispatch({
      type: LOAD_INGREDIENTS_ERROR,
      payload: error.message,
    });
  })
};