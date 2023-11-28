import { IBurgerCard } from '../../types/burgersTypes';

import ingredientsModalStyles from './ingredient-details.module.css';

interface IngredientDetailsProps {
  currentIngredient: IBurgerCard | null;
}

export default function IngredientDetails(props: IngredientDetailsProps) {
  const { currentIngredient } = props;
  return (
    <div className={`${ingredientsModalStyles.container} mb-8`}>
      <picture>
        <source srcSet={currentIngredient?.image_large} media="(min-width: 1280px)" />
        <source srcSet={currentIngredient?.image_mobile} media="(max-width: 780px)" />
        <img
          src={currentIngredient?.image}
          alt={currentIngredient?.name}
          className={`${ingredientsModalStyles.image} ml-4 mr-4 mb-1`}
        />
      </picture>
      <p className='text text_type_main-medium'>
        {currentIngredient?.name}
      </p>
      <div className={`${ingredientsModalStyles.propertiesContainer} mt-6`}>
        <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.calories}</p>
        </div>
        <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.proteins}</p>
        </div>
        <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.fat}</p>
        </div>
        <div className={`${ingredientsModalStyles.propetyContainer} ml-3`}>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  )

}