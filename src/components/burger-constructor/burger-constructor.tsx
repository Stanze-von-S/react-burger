import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerElement from '../burger-element/burger-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { IIngredientCard, IngredientsItemTypes } from '../../types/burgersTypes';
import { bun, ingredients } from '../../services/burger-constructor/selectors';
import { ingredientsOrder, orderIndex } from '../../services/order-details/selectors';
import { DRAG_INGREDIENT, RESET_INGREDIENTS } from '../../services/burger-constructor/actions';
import { CREATE_ORDER, RESET_ORDER, loadOrder } from '../../services/order-details/actions';

import ingredientStyles from './burger-constructor.module.css';

const ingredientStyle: CSSProperties = {};

function BurgerConstructor() {  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ingredientsList = useSelector(ingredients);
  const currentBun = useSelector(bun);
  const ingredientsOrderList = useSelector(ingredientsOrder);
  const orderId = useSelector(orderIndex);
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch({
      type: RESET_INGREDIENTS,
    });
    dispatch({
      type: RESET_ORDER,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    isLoading && dispatch<any>(loadOrder(ingredientsOrderList));
  }, [ingredientsOrderList, isLoading, dispatch]);

  // D-n-d для перетаскивания ингредиентов из списка ингредиентов в конструктор бургеров
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: IngredientsItemTypes.MAIN,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let border = '';
  if (isActive) {
    border = 'dashed 1px white';
  } else if (canDrop) {
    border = 'dashed 1px green';
  }

  // D-n-d для перетаскивания ингредиентов в конструкторе бургеров
  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: DRAG_INGREDIENT,
      payload: {
        dragIndex,
        hoverIndex,
      }
    });
  }, [dispatch]);

  const renderElement = useCallback(
    (element: IIngredientCard, index: number) => {
      return (
        <BurgerElement
          key={element.ingredientId}
          card={element}
          moveElement={moveElement}
          index={index}
        />
      );
    },
    [moveElement],
  );

  const total = useMemo(() => {
    let total = 0;
    if (currentBun) {
      total += currentBun.price;
    }
    total += ingredientsList.reduce((result, ingredient: IIngredientCard) => result + ingredient.price, total)
    return total;
  }, [currentBun, ingredientsList]);

  const placeOrder = () => {
    let list: string[] = [];
    if (!currentBun && ingredientsList.length !== 0) {
      list = [...ingredientsList.map(ingredient => ingredient._id)];
    }
    if (currentBun && ingredientsList.length === 0) {
      list = [currentBun._id, currentBun._id];
    }
    if (currentBun && ingredientsList.length !== 0) {
      list = [currentBun!._id, ...ingredientsList.map(ingredient => ingredient._id), currentBun!._id];
    }
    if (!currentBun && ingredientsList.length === 0) {
      return;
    }
    dispatch({
      type: CREATE_ORDER,
      payload: {
        ingredients: [...list]
      }
    });
    setIsLoading(true);
  }

  return (
    <section className={`${ingredientStyles.wrapper} mt-10 ml-5`}>
      <div className="mt-20">
        {
          <BurgerElement
            card={currentBun ? currentBun : undefined}
            type='top'key={'top'}
          />}
        {ingredientsList && ingredientsList.length ? <div ref={drop} style={{ ...ingredientStyle, border }} data-testid="dustbin" className={`${ingredientStyles.container} custom-scroll`}>
           {ingredientsList?.map((element: IIngredientCard, index: number) => renderElement(element, index))}
        </div> : <div ref={drop}>
          <BurgerElement data-testid="dustbin" />
        </div>}
        {
          <BurgerElement
            card={currentBun ? currentBun : undefined}
            type='bottom'
            key={'bottom'}
          />
        }
      </div>
      <div className={`${ingredientStyles.totalPriceContainer} mt-10 mr-4`}>
        <div className={`${ingredientStyles.totalPriceTitle} mr-10`}>
          <p className="text text_type_digits-medium mr-3">
            {total}
          </p>
          <div className={ingredientStyles.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={placeOrder}>
          Оформить заказ
        </Button>
        <>
          {orderId && (
            <Modal onClose={closeModalHandler}>
              <OrderDetails  />
            </Modal>
          )}
        </>
      </div>
    </section>
  )
}

export default BurgerConstructor;
