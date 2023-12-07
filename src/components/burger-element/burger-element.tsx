import React from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerCard } from '../../types/burgersTypes';
import ConstructorElementCustom from '../constructor-element-custom/constructor-element-custom';

import elementStyles from './burger-element.module.css';

interface IBurgerElementProps {
  card: IBurgerCard;
  type?: 'top' | 'bottom';
}

export default function BurgerElement({ card, type }: IBurgerElementProps) {
  return (
    <div className={`${elementStyles.container} ${type !== 'top' ? 'mt-4' : ''}`}>
      {!type && <DragIcon type="primary"/>}
      <ConstructorElementCustom type={type} card={card} />
    </div>
  );
}