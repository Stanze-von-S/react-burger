import Modal from '../modal/modal';
import image from '../../images/done.png';

import modalOrderStyles from './order-details.module.css';

interface ModalOrderProps {
  onClose: () => void;
}

export default function OrderDetails(props: ModalOrderProps) {
  const { onClose } = props;
  return (
    <Modal onClose={onClose}>
      <div className={`${modalOrderStyles.wrapper} mt-20 mb-20`}>
        <p className='text text_type_digits-large'>034536</p>
        <p className='text text_type_main-medium mt-6'>идентификатор заказа</p>
        <img src={image} alt='Галка' className='mt-5 mb-5'/>
        <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );
}