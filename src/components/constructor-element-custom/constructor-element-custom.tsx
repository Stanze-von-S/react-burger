import React, { forwardRef } from 'react';
import { CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IBurgerCard } from '../../types/burgersTypes';
import type { CSSProperties } from 'react';
import constructorElementStyles from './constructor-element-custom.module.css';

interface IConstructorElementCustomProps {
  card: IBurgerCard;
  style?: CSSProperties;
  type?: 'top' | 'bottom';
}

const ConstructorElementCustom = forwardRef(({ card, type, style }: IConstructorElementCustomProps, ref) => {
  const name = type === 'top' ? `${card.name} (верх)` : type === 'bottom' ? `${card.name} (низ)` : card.name;

  return (
    //@ts-ignore
    <div ref={ref}
      style={style}
      className={`${constructorElementStyles.constructorElement}
      ${type === 'top' ? constructorElementStyles.constructorElement_pos_top : type === 'bottom' ? constructorElementStyles.constructorElement_pos_bottom : ''}
      ${type ? 'mr-4' : 'mr-1'}`}
    >
      <div className={constructorElementStyles.constructorElement__row}>
        <img
          src={card.image}
          alt={card.name}
          className={constructorElementStyles.constructorElement__image}
        />
        <p className={`${constructorElementStyles.constructorElement__text} text text_type_main-default`}>
          {name}
        </p>
        <div className={constructorElementStyles.constructorElement__price}>
          <p>
            {card.price}
          </p>
          <CurrencyIcon type='primary' />
          {type ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
        </div>
      </div>
    </div>
  );
});

export default ConstructorElementCustom;
