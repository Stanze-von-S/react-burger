import React from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { bun, ingredients } from '../../services/burger-constructor/selectors';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  title: string;
}

const BurgerIngredientsTypeContainer = React.forwardRef(({ cards, title }: BurgerIngredientsTypeContainerProps, ref) => {
  const bunElement = useSelector(bun);
  const ingredientsList = useSelector(ingredients);
  const mapIngredients = new Map<string, number>();

  ingredientsList.forEach((card => {
    if (mapIngredients.has(card._id)) {
      mapIngredients.set(card._id, mapIngredients.get(card._id)!  + 1);
    } else {
      mapIngredients.set(card._id, 1);
    }
  }));

  if (cards.length > 0 && cards[0].type === 'bun') {
    if (bunElement) {
      cards.forEach(card => card._id === bunElement._id ? mapIngredients.set(card._id, 2) : mapIngredients.delete(card._id));
    }
  }

  return (
    <div className={constructorTypesContainerStyles.container} ref={ref as React.RefObject<HTMLDivElement>}>
      <h3 className="text text_type_main-medium">
        {title}
      </h3>
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {cards.length ? cards.map(card => {
          const count = mapIngredients.get(card._id);
          return (
          <BurgerIngredientsCard card={card} key={card._id} count={count} />
        )}) : null}
      </div>
    </div>
  );
});

export default BurgerIngredientsTypeContainer;
