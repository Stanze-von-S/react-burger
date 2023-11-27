import modalOverlayStyles from './modal-overlay.module.css'

interface ModalOverlayProps {
  onClose: () => void;
}

export default function ModalOverlay({ onClose }: ModalOverlayProps) {
  return (
    <div className={modalOverlayStyles.container} onClick={onClose} />
  );
}