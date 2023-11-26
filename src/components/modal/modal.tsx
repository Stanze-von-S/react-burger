import { useEffect, useState, useCallback, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('modal');

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, onClose } = props;
  const [isMounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleClose: MouseEventHandler<HTMLParagraphElement> =
    useCallback(() => {
      onClose?.();
    }, [onClose]);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      const handleWrapperClick = (event: MouseEvent) => {
        const { target } = event;
        // rootRef.current - обёртка вокруг разных div, в том числе, ModalOverlay, который идёт последним
        // извлекаем его, и далее - проверяем на совпадение с target
        const overlay = rootRef.current?.lastChild;

        if (target instanceof Node && overlay === target) {
          onClose?.();
        }
      };
      const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      window.addEventListener('click', handleWrapperClick);
      window.addEventListener('keydown', handleEscapePress);

      return () => {
        window.removeEventListener('click', handleWrapperClick);
        window.removeEventListener('keydown', handleEscapePress);
      };
    }, [onClose]);
  
    return (
      isMounted
      ? ReactDOM.createPortal(
        (
          <div className={modalStyles.wrapper} ref={rootRef}>
            <div className={modalStyles.container}>
              <p className={`${modalStyles.close} text text_type_main-large`} onClick={handleClose}>+</p>
              {children}
            </div>
            <ModalOverlay />
          </div>
        ),
        modalRoot!
      ) : null
    );
  }
