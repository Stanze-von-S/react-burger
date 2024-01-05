import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
import './app.module.css';
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
  
  useEffect(() => {
    dispatch<any>(loadList());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.wrapper}>
          {status === 'SUCCESS' && <BurgerIngredients />}
          {status === 'LOADING' && <div>Загрузка</div>}
          {status === 'ERROR' && <div>Ошибка</div>}
          <BurgerConstructor />          
        </main>
      </DndProvider>
    </>
  );
}

export default App;
