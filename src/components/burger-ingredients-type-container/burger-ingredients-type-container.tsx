import React, { useState } from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { IBurgerList } from '../../types/burgersTypes';

import constructorTypesContainerStyles from './burger-ingredients-type-container.module.css';

interface BurgerIngredientsTypeContainerProps {
  cards: IBurgerList;
  title: string;
}

const BurgerIngredientsTypeContainer = React.forwardRef(({ cards, title }: BurgerIngredientsTypeContainerProps, ref) => {
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [bunCounts, setBunCounts] = useState<Map<string, number>>(new Map());
  
  const setCount = (_id: string) => {   
    setCounts((prevState: Map<string, number>) => {
      if (prevState.has(_id)) {
        prevState.set(_id, prevState.get(_id)! + 1);
        const nextState = new Map(prevState);
        return nextState;
      } else {
        prevState.set(_id, 1);
        const nextState = new Map(prevState);
        return nextState;
      }
    }); 
  };

  const setBun = (_id: string) => {
    setBunCounts((prevState: Map<string, number>) => {
      if (prevState.size === 0) {
        prevState.set(_id, 2);
        const nextState = new Map(prevState);
        return nextState;
      } else {
        prevState.clear();
        prevState.set(_id, 2);
        const nextState = new Map(prevState);
        return nextState;
      }
    });
  };

  return (
    //@ts-ignore
    <div className={constructorTypesContainerStyles.container} ref={ref}>
      <h3 className="text text_type_main-medium">
        {title}
      </h3>
      <div className={`${constructorTypesContainerStyles.typeContainer} ml-4 mt-6 mr-4 mb-2`}>
        {cards.length ? cards.map(card => {
          const count = counts.get(card._id);
          const bunCount = bunCounts.get(card._id);
          return (
          <BurgerIngredientsCard card={card} key={card._id} setCount={setCount} setBun={setBun} count={count} bunCount={bunCount} />
        )}) : null}
      </div>
    </div>
  );
});

export default BurgerIngredientsTypeContainer;
