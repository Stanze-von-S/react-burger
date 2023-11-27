import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerCard } from '../../types/burgersTypes';

import constructorCardStyles from './burger-ingredients-card.module.css';

interface IBurgerIngredientsCardProps {
  card: IBurgerCard;
  onClick: any;
}

export default function BurgerIngredientsCard({ card, onClick }: IBurgerIngredientsCardProps) {
  const handleClick = () => {
    onClick()(card);
  }
  return (
    <div className={`${constructorCardStyles.cardContainer} mb-8`} onClick={handleClick}>
      <picture>
        <source srcSet={card.image_large} media="(min-width: 1280px)" />
        <source srcSet={card.image_mobile} media="(max-width: 780px)" />
        <img
          src={card.image}
          alt={card.name}
          className={`${constructorCardStyles.image} ml-4 mr-4 mb-1`}
        />
      </picture>
      <div className={`${constructorCardStyles.price} mt-1 mb-1`}>
        <p className={`${constructorCardStyles.priceTitle} mr-2 text text_type_digits-default`}>
          20
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${constructorCardStyles.cardTitle} text text_type_main-small`}>
        {card.name}
      </p>
      <Counter count={1} size="default" />
    </div>
  )
}
