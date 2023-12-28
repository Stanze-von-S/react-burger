import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredientsTypeContainer from '../burger-ingredients-type-container/burger-ingredients-type-container';
import TabElement from '../tab-element/tab-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { buns, sauces, mains } from '../../services/burger-ingredients/selectors';
import { ingredientDetails } from '../../services/ingredient-details/selectors';
import { DROP_INGREDIENT } from '../../services/ingredient-details/actions';

import constructorStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {  
  const bunsList = useSelector(buns);
  const saucesList = useSelector(sauces);
  const mainsList = useSelector(mains);
  const ingredientDetailsCurrent = useSelector(ingredientDetails);
  const [tabState, setTabState] = useState<string>('bun');
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: DROP_INGREDIENT,
    });
  }

  const handlerScroll = () => {
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
  };

  return (
    <section className={`${constructorStyles.wrapper} mt-10 mr-5`}>
      <h2 className={`${constructorStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <TabElement currentTab={tabState} setTab={setTabState}/>
      <div className={`${constructorStyles.container} custom-scroll`} ref={containerRef} onScroll={handlerScroll}>        
        <BurgerIngredientsTypeContainer cards={bunsList} title='Булки' key={'bun'} ref={bunRef}/>
        <BurgerIngredientsTypeContainer cards={saucesList} title='Соусы' key={'sauce'} ref={sauceRef}/>
        <BurgerIngredientsTypeContainer cards={mainsList} title='Начинки' key={'main'} ref={mainRef}/>
      </div>
      {ingredientDetailsCurrent && (
        <Modal onClose={closeModal} title={'Детали ингредиента'} >
          {ingredientDetailsCurrent && <IngredientDetails currentIngredient={ingredientDetailsCurrent} />}
        </Modal>
      )}
    </section>
  )
};

export default BurgerIngredients;