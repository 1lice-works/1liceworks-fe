import { create } from 'zustand';

import { ModalContainerProps } from './ModalContainerProps';

interface ModalState {
  isOpen: boolean;
  modalProps: ModalContainerProps | null;
  openModal: (props: ModalContainerProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalProps: null,
  openModal: (props) => set({ isOpen: true, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalProps: null }),
}));
