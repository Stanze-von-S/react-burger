import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerCard } from '../../types/burgersTypes';

import elementStyles from './burger-element.module.css';

interface IBurgerElementProps {
  card: IBurgerCard;
  type?: 'top' | 'bottom';
}

export default function BurgerElement({ card, type }: IBurgerElementProps) {
  const name = type === 'top' ? `${card.name} (верх)` : type === 'bottom' ? `${card.name} (низ)` : card.name;
  return (
    <div className={`${elementStyles.container} ${type !== 'top' ? 'mt-4' : ''}`}>
      {!type && <DragIcon type="primary"/>}
      <ConstructorElement type={type} text={name} price={card.price} thumbnail={card.image} isLocked={!!type} extraClass={`${type ? 'mr-4' : 'mr-1'}`} />
    </div>
  );
}