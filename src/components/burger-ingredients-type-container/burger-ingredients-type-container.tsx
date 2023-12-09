import React from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  type: string;
  onClick: any;
}

const BurgerIngredientsTypeContainer = React.forwardRef(({ cards, type, onClick }: BurgerIngredientsTypeContainerProps, ref) => {
  const typesCard = cards.length ? cards.filter(card => card.type === type) : [];
  return (
    <>
    {/*@ts-ignore*/ }
    <div className={constructorTypesContainerStyles.container} ref={ref}>
      <h3 className="text text_type_main-medium">
        {type === 'bun' && 'Булки'}
        {type === 'main' && 'Начинки'}
        {type === 'sauce' && 'Соусы'}
      </h3>
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {typesCard.length ? typesCard.map(card => (
          <BurgerIngredientsCard card={card} key={card._id} onClick={onClick} />
        )) : null}
      </div>
    </div>
    </>
  );
});

export default BurgerIngredientsTypeContainer;
