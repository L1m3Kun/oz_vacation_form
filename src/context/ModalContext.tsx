import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import Modal, { ModalProps } from "../components/Modal/Modal";

interface ModalContextType {
  openList: ModalProps[];
  closeModal: (modalKey: string) => void;
  openModal: (modal: ModalProps) => void;
}

const DEFAULT_MODAL: ModalContextType = {
  openList: [],
  closeModal: () => {},
  openModal: () => {},
};

const MODAL_CONTEXT = createContext<ModalContextType>(DEFAULT_MODAL);

export const useModal = () => {
  const ctx = useContext(MODAL_CONTEXT);
  if (!ctx) throw new Error("context가 없습니다.");
  return ctx;
};

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [openList, setOpenList] = useState<ModalProps[]>([]);

  const closeModal = (modalKey: string) => {
    setOpenList((prev) => prev.filter((v) => v.modalKey !== modalKey));
  };

  const openModal = useCallback(
    (modal: ModalProps) => {
      if (openList.some((v) => v.modalKey === modal.modalKey)) {
        throw new Error("이미 열려있는 모달입니다.");
      }
      setOpenList((prev) => [...prev, { ...modal }]);
    },
    [openList]
  );
  return (
    <MODAL_CONTEXT.Provider value={{ openList, openModal, closeModal }}>
      {children}
      {openList.map(({ modalKey, ...rest }) => (
        <Modal key={modalKey} modalKey={modalKey} {...rest} />
      ))}
    </MODAL_CONTEXT.Provider>
  );
};
