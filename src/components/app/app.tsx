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
      fetch(url)
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
          if(data.success) {
            setCards(data.data)
        }
          return Promise.reject(`Ошибка ${data.status}`)
        })
        .catch(console.error);
    }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.wrapper}>
        <BurgerIngredients cards={cards} />
        <BurgerConstructor cards={cards} />
      </main>
    </>
  );
}

export default App;
