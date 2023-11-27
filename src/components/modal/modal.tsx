import { useEffect, useState } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('modal');

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, onClose, title } = props;
  const [isMounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      window.addEventListener('keydown', handleEscapePress);

      return () => {
        window.removeEventListener('keydown', handleEscapePress);
      };
    }, [onClose]);
  
    return (
      isMounted
      ? ReactDOM.createPortal(
        (
          <div className={modalStyles.wrapper}>
            <div className={modalStyles.container}>
              <div className={`${modalStyles.close}`} onClick={onClose}><CloseIcon type='primary' /></div>
              {title && <p className='text text_type_main-large ml-10 mt-10'>{title}</p>}
              {children}
            </div>
            <ModalOverlay onClose={onClose} />
          </div>
        ),
        modalRoot!
      ) : null
    );
  }
