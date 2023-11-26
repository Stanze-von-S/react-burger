import React, { useEffect, useState } from 'react';
import './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { IBurgerList } from '../../types/burgersTypes';

import appStyles from './app.module.css';

function App() {
  const [cards, setCards] = useState<IBurgerList>([]);
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    try {
      fetch(url)
        .then(data => data.json())
        .then(data => {
          if(data.success) {
            setCards(data.data)
        }});
    } catch (error) {
      console.log(error);
    }}, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.wrapper}>
        <BurgerIngredients cards={cards} key={'ingredients'}/>
        <BurgerConstructor cards={cards} key={'constructor'}/>
      </main>
    </>
  );
}

export default App;
