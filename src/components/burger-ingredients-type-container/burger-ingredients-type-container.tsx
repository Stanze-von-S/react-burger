import React, { useContext } from 'react';
import { AppContext } from '../app/app';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  title: string;
}

const BurgerIngredientsTypeContainer = React.forwardRef(({ cards, title }: BurgerIngredientsTypeContainerProps, ref) => {
  const { state }: any = useContext(AppContext);
  return (
    //@ts-ignore
    <div className={constructorTypesContainerStyles.container} ref={ref}>
      <h3 className="text text_type_main-medium">
        {title}
      </h3>
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {cards.length ? cards.map(card => {
          const count = state ? state.ingredients.get(card._id) : undefined;
          const bunCount = state ? state.buns.get(card._id) : undefined;
          return (
          <BurgerIngredientsCard card={card} key={card._id} count={count} bunCount={bunCount} />
        )}) : null}
      </div>
    </div>
  );
});

export default BurgerIngredientsTypeContainer;
