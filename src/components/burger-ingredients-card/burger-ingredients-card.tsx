import React, { useContext } from 'react';
import type { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../app/app';
import { IBurgerCard, IngredientsItemTypes } from '../../types/burgersTypes';
import { ADD_BUN, ADD_INGREDIENT } from '../../services/burger-constructor/actions';
import { CREATE_INGREDIENT } from '../../services/ingredient-details/actions';

import constructorCardStyles from './burger-ingredients-card.module.css';

interface IBurgerIngredientsCardProps {
  card: IBurgerCard;
  count?: number;
  bunCount?: number;
}

const style: CSSProperties = {
  border: '1px dashed gray',
  cursor: 'move',
}

export interface BoxProps {
  _id: string;
}

interface DropResult {
  _id: string;
}

export default function BurgerIngredientsCard({ card, count, bunCount }: IBurgerIngredientsCardProps) {
  const dispatch = useDispatch();
  const { reducerDispatch } = useContext(AppContext);
  const handleClick = () => {
    dispatch({
      type: CREATE_INGREDIENT,
      payload: card,
    })
  };
  const cardCount = count ? count : bunCount ? bunCount : 0;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: card.type !== 'bun' ? IngredientsItemTypes.MAIN : IngredientsItemTypes.BUN,
    item: { card },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        if(card.type !== 'bun') {
          dispatch({ type: ADD_INGREDIENT, payload: card });
          //@ts-ignore
          reducerDispatch({
            type: 'increments_ingredient',
            payload: card._id,
          });
        } else {
          dispatch({ type: ADD_BUN, payload: card });
          //@ts-ignore
          reducerDispatch({
            type: 'increments_buns',
            payload: card._id,
          });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1
  return (
    <div className={`${constructorCardStyles.cardContainer} mb-8`} onClick={handleClick} ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
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
          {card.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${constructorCardStyles.cardTitle} text text_type_main-small`}>
        {card.name}
      </p>
      {!!cardCount && <Counter count={cardCount} size="default" />}
    </div>
  )
}
