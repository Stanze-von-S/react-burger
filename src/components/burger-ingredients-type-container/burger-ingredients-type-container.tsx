import React from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  type: string;
  onClick: any;
}

export default function BurgerIngredientsTypeContainer({ cards, type, onClick }: BurgerIngredientsTypeContainerProps) {
  const typesCard = cards.length ? cards.filter(card => card.type === type) : [];
  return (
    <>
      {type === 'bun' && <h3 className="text text_type_main-medium">
        Булки
      </h3>}
      {type === 'main' && <h3 className="text text_type_main-medium">
        Начинки
      </h3>}
      {type === 'sauce' && <h3 className="text text_type_main-medium">
        Соусы
      </h3>}
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {typesCard.length ? typesCard.map(card => (
          <BurgerIngredientsCard card={card} key={card._id} onClick={onClick} />
        )) : null}
      </div>
    </>
  );
}
