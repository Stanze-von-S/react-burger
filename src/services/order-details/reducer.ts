import { IOrderDetailsState } from '../../types/burgersTypes';
import { CREATE_ORDER, LOAD_ORDER_ERROR, LOAD_ORDER_PENDING, LOAD_ORDER_SUCCESS, RESET_ORDER } from './actions';

const initialState: IOrderDetailsState = {
  orderId: '',
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        ingredients: [...action.payload.ingredients],
      };
    }
    case LOAD_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        orderId: action.payload,
      };
    }
    case LOAD_ORDER_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case LOAD_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,        
      }
    }
    case RESET_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
