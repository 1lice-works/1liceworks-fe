import React from 'react';
import { createPortal } from 'react-dom';

import { useModalStore } from '../model/useModalStore';
import { ModalContainer } from './ModalContainer';

export const ModalManager = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const modalProps = useModalStore((state) => state.modalProps);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!isOpen || !modalProps) return null;

  const handleOverlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/30'
      onClick={handleOverlayClick}
      onTouchStart={handleOverlayClick}
    >
      <ModalContainer
        {...modalProps}
        onLeftButtonClick={
          modalProps.leftButtonProps.onClick || (() => closeModal())
        }
        onRightButtonClick={
          modalProps.rightButtonProps.onClick || (() => closeModal())
        }
      />
    </div>,
    document.body
  );
};
