import { useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';

// import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerElement from '../burger-element/burger-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { IIngredientCard, IBurgerConstructorState, IngredientsItemTypes, Item } from '../../types/burgersTypes';
import { bun, ingredients } from '../../services/burger-constructor/selectors';
import { DRAG_INGREDIENT } from '../../services/burger-constructor/actions';

import ingredientStyles from './burger-constructor.module.css';

const ingredientStyle: CSSProperties = {};

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const ingredientsList = useSelector(ingredients);
  const currentBun = useSelector(bun);
  const dispatch = useDispatch();
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
  const moveElement = useCallback((dragIndex: number, hoverIndex: number | undefined) => {
    // Здесь должен быть dispatch из redux
    dispatch({
      type: DRAG_INGREDIENT,
      payload: {
        dragIndex,
        hoverIndex,
      }
    });
    /*setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )*/
  }, []);

  const renderElement = useCallback(
    (element: IIngredientCard) => {
      return (
        <BurgerElement
          key={element.ingredientId}
          card={element}
          index={element.index}
          moveElement={moveElement}
        />
      );
    },
    [],
  );

  const total = useMemo(() => {
    let total = 0;
    if (currentBun) {
      total += currentBun.price;
    }
    total += ingredientsList.reduce((result, ingredient: IIngredientCard) => result + ingredient.price, total)
    return total;
  }, [currentBun, ingredientsList])

  return (
    <section className={`${ingredientStyles.wrapper} mt-10 ml-5`}>
      <div className="mt-20">
        {<BurgerElement card={currentBun ? currentBun : undefined} type='top' key={'top'}/>}
        {ingredientsList && ingredientsList.length ? <div ref={drop} style={{ ...ingredientStyle, border }} data-testid="dustbin" className={`${ingredientStyles.container} custom-scroll`}>
           {ingredientsList?.map((element: IIngredientCard) => renderElement(element))}
        </div> : <div ref={drop}><BurgerElement data-testid="dustbin" /></div>}
        {<BurgerElement card={currentBun ? currentBun : undefined} type='bottom' key={'bottom'}/>}
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
        <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
          Оформить заказ
        </Button>
        <>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <OrderDetails  />
            </Modal>
          )}
        </>
      </div>
    </section>
  )
}

export default BurgerConstructor;
