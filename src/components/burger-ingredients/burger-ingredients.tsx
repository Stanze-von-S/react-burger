import { useState } from 'react';
import BurgerIngredientsTypeContainer from '../burger-ingredients-type-container/burger-ingredients-type-container';
import TabElement from '../tab-element/tab-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IBurgerCard, IBurgerList } from '../../types/burgersTypes';

import constructorStyles from './burger-ingredients.module.css';

interface IBurgerIngredientsProps {
  cards: IBurgerList;
}

export default function BurgerIngredients({ cards }: IBurgerIngredientsProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [burger, setBurger] = useState<IBurgerCard | null>(null);
  const handleOpenModal = () => (card: any) => {
    setShowModal(true);
    return setBurger(card);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <section className={`${constructorStyles.wrapper} mt-10 mr-5`}>
      <h2 className={`${constructorStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <TabElement />
      <div className={`${constructorStyles.container} custom-scroll`}>        
        <BurgerIngredientsTypeContainer cards={cards} type='bun' key={'bun'} onClick={handleOpenModal}/>
        <BurgerIngredientsTypeContainer cards={cards} type='sauce' key={'sauce'} onClick={handleOpenModal}/>
        <BurgerIngredientsTypeContainer cards={cards} type='main' key={'main'} onClick={handleOpenModal}/>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal} title={'Детали ингредиента'} >
          <IngredientDetails currentIngredient={burger} />
        </Modal>
      )}
    </section>
  )
}
