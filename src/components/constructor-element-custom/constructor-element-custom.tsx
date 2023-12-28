import React, { useContext, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../app/app';
import { IIngredientCard } from '../../types/burgersTypes';
import type { CSSProperties } from 'react';
import { DELETE_INGREDIENT } from '../../services/burger-constructor/actions';

import constructorElementStyles from './constructor-element-custom.module.css';

interface IConstructorElementCustomProps {
  card: IIngredientCard;
  style?: CSSProperties;
  type?: 'top' | 'bottom';
}

const ConstructorElementCustom = forwardRef(({ card, type, style }: IConstructorElementCustomProps, ref) => {
  const dispatch = useDispatch();
  const { reducerDispatch } = useContext(AppContext);
  const name = type === 'top' ? `${card.name} (верх)` : type === 'bottom' ? `${card.name} (низ)` : card.name;

  const deleteHandler = (ingredientId: string, _id: string) => {
    //@ts-ignore
    reducerDispatch({
      type: 'decrements_ingredient',
      payload: _id,
    });
    dispatch({
      type: DELETE_INGREDIENT,
      payload: ingredientId,
    });
  }

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
          {type ? <LockIcon type='secondary' /> : <DeleteIcon onClick={() => deleteHandler(card.ingredientId, card._id)} type='primary' />}
        </div>
      </div>
    </div>
  );
});

export default ConstructorElementCustom;
