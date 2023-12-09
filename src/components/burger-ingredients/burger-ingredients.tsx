import { useState, useRef } from 'react';
import BurgerIngredientsTypeContainer from '../burger-ingredients-type-container/burger-ingredients-type-container';
import { useModal } from '../../hooks/useModal';
import TabElement from '../tab-element/tab-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { IBurgerCard, IBurgerList } from '../../types/burgersTypes';

import constructorStyles from './burger-ingredients.module.css';

interface IBurgerIngredientsProps {
  cards: IBurgerList;
}

export const BurgerIngredients = (({ cards }: IBurgerIngredientsProps) => {
  const [burger, setBurger] = useState<IBurgerCard | null>(null);
  const [tabState, setTabState] = useState<string>('bun');
  const { isModalOpen, openModal, closeModal } = useModal();
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);
  const handleOpenModal = () => (card: any) => {
    openModal();
    return setBurger(card);
  };

  const handlerScroll = (e: any) => {
    const bun = bunRef.current;
    const main = mainRef.current;
    const sauce = sauceRef.current;
    const container = containerRef.current;

    let topContainer = 0;
    let topBun = 0;
    let bottomBun = 0;
    let topMain = 0;
    let bottomMain = 0;
    let topSauce = 0;
    let bottomSauce = 0;
    if (container) {
      //@ts-ignore
      topContainer = container.getBoundingClientRect().top;
    }
    if (bun) {
      //@ts-ignore
      topBun = bun.getBoundingClientRect().top - topContainer;
      //@ts-ignore
      bottomBun = bun.getBoundingClientRect().bottom - topContainer;
    }
    if (main) {
      //@ts-ignore
      topMain = main.getBoundingClientRect().top - topContainer;
      //@ts-ignore
      bottomMain = main.getBoundingClientRect().bottom - topContainer;
    }
    if (sauce) {
      //@ts-ignore
      topSauce = sauce.getBoundingClientRect().top - topContainer;
      //@ts-ignore
      bottomSauce = sauce.getBoundingClientRect().bottom - topContainer;
    }
    if (topBun <= 0 && bottomBun > 0) {
      setTabState('bun');
    } else if (topSauce <= 0 && bottomSauce > 0) {
      setTabState('sauce');
    } else if (topMain <= 0 && bottomMain > 0) {
      setTabState('main');
    }
  }

  return (
    <section className={`${constructorStyles.wrapper} mt-10 mr-5`}>
      <h2 className={`${constructorStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <TabElement currentTab={tabState} setTab={setTabState}/>
      <div className={`${constructorStyles.container} custom-scroll`} ref={containerRef} onScroll={handlerScroll}>        
        <BurgerIngredientsTypeContainer cards={cards} type='bun' key={'bun'} onClick={handleOpenModal} ref={bunRef}/>
        <BurgerIngredientsTypeContainer cards={cards} type='sauce' key={'sauce'} onClick={handleOpenModal} ref={sauceRef}/>
        <BurgerIngredientsTypeContainer cards={cards} type='main' key={'main'} onClick={handleOpenModal} ref={mainRef}/>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal} title={'Детали ингредиента'} >
          <IngredientDetails currentIngredient={burger} />
        </Modal>
      )}
    </section>
  )
});

export default BurgerIngredients;