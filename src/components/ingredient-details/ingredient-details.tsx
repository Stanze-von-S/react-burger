import { IBurgerCard } from '../../types/burgersTypes';
import Modal from '../modal/modal';

import ingredientsModalStyles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  onClose: () => void;
  card: IBurgerCard | null;
}

export default function IngredientDetails(props: IngredientDetailsProps) {
  const { card, onClose } = props;
  return (
    <Modal onClose={onClose}>
      <p className='text text_type_main-large ml-10 mt-10'>Детали ингредиента</p>
      <div className={`${ingredientsModalStyles.container} mb-8`}>
        <picture>
          <source srcSet={card?.image_large} media="(min-width: 1280px)" />
          <source srcSet={card?.image_mobile} media="(max-width: 780px)" />
          <img
            src={card?.image}
            alt="Картинка булки"
            className={`${ingredientsModalStyles.image} ml-4 mr-4 mb-1`}
          />
        </picture>
        <p className='text text_type_main-medium'>
          {card?.name}
        </p>
        <div className={`${ingredientsModalStyles.propertiesContainer} mt-6`}>
          <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
            <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
            <p className='text text_type_main-default text_color_inactive'>{card?.calories}</p>
          </div>
          <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
            <p className='text text_type_main-default text_color_inactive'>{card?.proteins}</p>
          </div>
          <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
            <p className='text text_type_main-default text_color_inactive'>{card?.fat}</p>
          </div>
          <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <p className='text text_type_main-default text_color_inactive'>{card?.carbohydrates}</p>
          </div>
        </div>
      </div>
    </Modal>
  )

}