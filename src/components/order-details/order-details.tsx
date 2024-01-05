import { useSelector } from 'react-redux';
import { orderIndex } from '../../services/order-details/selectors';
import image from '../../images/done.png';

import modalOrderStyles from './order-details.module.css';

export default function OrderDetails() {
  const orderId = useSelector(orderIndex);
  return (
    <div className={`${modalOrderStyles.wrapper} mt-20 mb-20`}>
      <p className='text text_type_digits-large'>{orderId}</p>
      <p className='text text_type_main-medium mt-6'>идентификатор заказа</p>
      <img src={image} alt='Галка' className='mt-5 mb-5'/>
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}