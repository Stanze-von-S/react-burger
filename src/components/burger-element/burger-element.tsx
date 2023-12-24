import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientCard, IngredientsItemTypes } from '../../types/burgersTypes';
import ConstructorElementCustom from '../constructor-element-custom/constructor-element-custom';
import ConstructorElementCustomEmpty from '../constructor-element-custom-empty/constructor-element-custom-empty';
import type { DragItem, ElementProps } from '../../types/burgersTypes';
import { ConstructorItemTypes } from '../../utils/constants';

import elementStyles from './burger-element.module.css';

interface IBurgerElementProps {
  card?: IIngredientCard;  
  moveElement?: (dragIndex: number, hoverIndex: number | undefined) => void;
  index?: number;
  type?: 'top' | 'bottom';
}

const ingredientStyle: CSSProperties = {};
const constructorStyle: CSSProperties = {
  cursor: 'move',
}

const BurgerElement = ({ card, type, moveElement }: IBurgerElementProps) => {
  // D-n-d для перетаскивания ингредиентов из списка ингредиентов в конструктор бургера.
  const [{ canDrop, isOver }, dropBun] = useDrop(() => ({
    accept: type ? IngredientsItemTypes.BUN : IngredientsItemTypes.MAIN,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: card?.type && monitor.isOver(),
      canDrop: card?.type && monitor.canDrop(),
    }),
  }));

  const isIngredientActive = canDrop && isOver;
  let border = '';
  if (isIngredientActive) {
    border = 'dashed 1px white';
  } else if (canDrop) {
    border = 'dashed 1px green';
  }
  
  // D-n-d для перетаскивания ингредиентов внутри конструктора бургеров
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ConstructorItemTypes.ELEMENT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = card?.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveElement && moveElement(dragIndex, hoverIndex as number)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex!
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ConstructorItemTypes.ELEMENT,
    item: () => {
      return { card }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  if (type) {
    return (
      <div className={`${elementStyles.container} ${type !== 'top' ? 'mt-4' : ''}`}>
      {card ? <ConstructorElementCustom type={type} card={card} ref={dropBun} style={{ ...ingredientStyle, border }} data-testid="dustbin" /> : (
        <ConstructorElementCustomEmpty type={type} ref={dropBun} style={{ ...ingredientStyle, border }} data-testid="dustbin" />
      )}
    </div>
    )
  } else {
    return (
      <div className={`${elementStyles.container} mt-4`} ref={ref} style={{ ...constructorStyle, opacity }} data-handler-id={handlerId}>
        {!!card && <DragIcon type="primary"/>}
        {card ? <ConstructorElementCustom type={type} card={card}/> : (
          <ConstructorElementCustomEmpty type={type} ref={dropBun} style={{ ...ingredientStyle, border }} data-testid="dustbin" />
        )}
      </div>
    );
  }

};

export default BurgerElement;