import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
import './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadList } from '../../services/burger-ingredients/actions';

import appStyles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    //@ts-ignore
    dispatch(loadList());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={appStyles.wrapper}>
          <BurgerIngredients />
          <BurgerConstructor />          
        </main>
      </DndProvider>
    </>
  );
}

export default App;
