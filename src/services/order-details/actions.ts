import { loadOrderApi } from '../../utils/load-list-ingredients-api';
export const CREATE_ORDER = 'CREATE_ORDER';
export const LOAD_ORDER_SUCCESS = 'LOAD_ORDER_SUCCESS';
export const LOAD_ORDER_PENDING = 'LOAD_ORDER_PENDING';
export const LOAD_ORDER_ERROR = 'LOAD_INGREDIENTS_ERROR';
export const RESET_ORDER = 'RESET_ORDER';

export const loadOrder = (ingredients: string[]) => (dispatch: any) => {
  dispatch({ type: LOAD_ORDER_PENDING });
  return loadOrderApi(ingredients).then(res => {
    dispatch({
      type: LOAD_ORDER_SUCCESS,
      payload: res,
    });
  })
  .catch(error => {
    dispatch({
      type: LOAD_ORDER_ERROR,
      payload: error.message,
    });
  });
};
