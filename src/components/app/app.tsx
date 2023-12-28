import React, { createContext, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
import './app.module.css';
import type { IState, IPayload } from '../../types/burgersTypes';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadList } from '../../services/burger-ingredients/actions';
import { ingredientsError, ingredientsLoading } from '../../services/burger-ingredients/selectors';

import appStyles from './app.module.css';

interface IContext {
  state: any;
  reducerDispatch: any;
}
export const AppContext = createContext<IContext>({} as IContext);

function App() {
  const dispatch = useDispatch();
  const error = useSelector(ingredientsError);
  const loading = useSelector(ingredientsLoading);
  const status = error ? 'ERROR' : loading ? 'LOADING' : 'SUCCESS';
  
  const initialState = {
    ingredients: new Map<string, number>(),
    buns: new Map<string, number>(),
  };

  const reducer = (state: IState, action: IPayload) => {
    switch (action.type) {
      case 'increments_ingredient': {
        if (state.ingredients.has(action.payload)) {
          state.ingredients.set(action.payload, state.ingredients.get(action.payload)! + 1);
        } else {
          state.ingredients.set(action.payload, 1);
        }
        return { ...state };
      }
      case 'decrements_ingredient': {
        state.ingredients.set(action.payload, state.ingredients.get(action.payload)! - 1);
        if (state.ingredients.get(action.payload) === 0) {
          state.ingredients.delete(action.payload);
        }
        return { ...state };
      }
      case 'increments_buns': {
        if (state.buns.size === 0) {
          state.buns.set(action.payload, 2);
        } else {
          state.buns.clear();
          state.buns.set(action.payload, 2);
        }
        return { ...state };
      }
      case 'reset_counters': {
        return initialState;
      }
    }
  }

  //@ts-ignore
  const [state, reducerDispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    //@ts-ignore
    dispatch(loadList());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.wrapper}>
          <AppContext.Provider value={{ state, reducerDispatch }}>
            {status === 'SUCCESS' && <BurgerIngredients />}
            {status === 'LOADING' && <div>Загрузка</div>}
            {status === 'ERROR' && <div>Ошибка</div>}
            <BurgerConstructor />          
          </AppContext.Provider> 
        </main>
      </DndProvider>
    </>
  );
}

export default App;
