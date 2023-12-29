import React from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import {  ingredientsCounter, bunsCounter } from '../../services/counter-ingredients/selectors';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  title: string;
}

const BurgerIngredientsTypeContainer = React.forwardRef(({ cards, title }: BurgerIngredientsTypeContainerProps, ref) => {
  const buns = useSelector(bunsCounter);
  const ingredients = useSelector(ingredientsCounter);
  return (
    <div className={constructorTypesContainerStyles.container} ref={ref as React.RefObject<HTMLDivElement>}>
      <h3 className="text text_type_main-medium">
        {title}
      </h3>
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {cards.length ? cards.map(card => {
          const count = ingredients.get(card._id);
          const bunCount = buns.get(card._id);
          return (
          <BurgerIngredientsCard card={card} key={card._id} count={count} bunCount={bunCount} />
        )}) : null}
      </div>
    </div>
  );
});

export default BurgerIngredientsTypeContainer;
