import { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerElement from '../burger-element/burger-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { IBurgerList } from '../../types/burgersTypes';

import ingredientStyles from './burger-constructor.module.css';

interface IBurgerConstructorProps {
  cards: IBurgerList;
}

function BurgerConstructor({ cards }: IBurgerConstructorProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <section className={`${ingredientStyles.wrapper} mt-10 ml-5`}>
      <div className="mt-20">
        {cards.length && <BurgerElement card={cards[0]} type='top' key={'top'}/>}
        <div className={`${ingredientStyles.container} custom-scroll`}>
          {cards.length ? cards.filter(card => card.type !== 'bun').map((card) => (
            <BurgerElement card={card} key={card._id} />
          )) : null}
        </div>
        {cards.length && <BurgerElement card={cards[0]} type='bottom' key={'bottom'}/>}
      </div>
      <div className={`${ingredientStyles.totalPriceContainer} mt-10 mr-4`}>
        <div className={`${ingredientStyles.totalPriceTitle} mr-10`}>
          <p className="text text_type_digits-medium mr-3">
            610
          </p>
          <div className={ingredientStyles.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
        <>
          {showModal && (
            <Modal onClose={handleCloseModal}>
              <OrderDetails  />
            </Modal>
          )}
        </>
      </div>
    </section>
  )
}

export default BurgerConstructor;
