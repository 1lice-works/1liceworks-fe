import { useModalStore } from '../model/useModalStore';
import { ModalContainer } from './ModalContainer';

export const ModalManager = () => {
  const isModalOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black/30'
      onClick={closeModal}
    >
      <ModalContainer />
    </div>
  );
};
