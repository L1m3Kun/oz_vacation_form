import { useEffect, useRef } from "react";
import CustomButton from "../../common/CustomButton";
import { useModal } from "../../context/ModalContext";
import withModalContainer from "../../common/withModalContainer";

export interface ModalProps {
  type: "alert" | "confirm";
  modalKey: string;
  title?: string;
  titleClassName?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmMessage?: string;
  cancelMessage?: string;
  modalRef?: React.RefObject<HTMLElement>;
}

const AlertModal = ({
  title,
  content,
  confirmMessage,
  onConfirm,
  modalRef,
  titleClassName,
}: Omit<ModalProps, "type" | "onCancel" | "cancelMessage" | "modalKey">) => {
  return (
    <article
      ref={modalRef}
      className={
        "p-5 rounded-md shadow-sm bg-white flex flex-col justify-center items-center"
      }
    >
      <h1
        className={
          titleClassName ??
          "font-semibold text-lg text-dark border-b-2 border-solid w-3/4 text-center border-dark-900"
        }
      >
        {title}
      </h1>
      <p className="text-dark py-10 px-8">{content}</p>
      <CustomButton mode="default" onClick={onConfirm}>
        {confirmMessage ?? "확인"}
      </CustomButton>
    </article>
  );
};
const ConfirmModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  confirmMessage,
  cancelMessage,
  modalRef,
}: Omit<ModalProps, "type" | "modalKey">) => {
  return (
    <article className="" ref={modalRef}>
      <h1 className="">{title}</h1>
      <p className="">{content}</p>
      <div className="">
        <CustomButton mode="outline" onClick={onCancel}>
          {cancelMessage ?? "취소"}
        </CustomButton>
        <CustomButton mode="default" onClick={onConfirm}>
          {confirmMessage ?? "확인"}
        </CustomButton>
      </div>
    </article>
  );
};

const ModalContent = ({ type, modalKey, ...modalContents }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { openList, closeModal } = useModal();
  useEffect(() => {
    const modalCloseClick = (event: MouseEvent) => {
      const ref = modalRef.current;
      if (ref && openList.some((v) => v.modalKey === modalKey)) {
        if (!(ref === event.target)) {
          closeModal(modalKey);
        }
      }
    };
    document.addEventListener("mousedown", modalCloseClick);
    return () => {
      document.removeEventListener("mousedown", modalCloseClick);
    };
  }, [closeModal, modalKey, openList]);

  switch (type) {
    case "confirm":
      return (
        <ConfirmModal
          title={modalContents.title}
          content={modalContents.content}
          confirmMessage={modalContents.confirmMessage}
          onConfirm={modalContents.onConfirm}
          cancelMessage={modalContents.cancelMessage}
          onCancel={modalContents.onCancel}
          modalRef={modalRef}
        />
      );
    default:
      return (
        <AlertModal
          title={modalContents.title}
          content={modalContents.content}
          confirmMessage={modalContents.confirmMessage}
          onConfirm={modalContents.onConfirm}
          modalRef={modalRef}
        />
      );
  }
};

const Modal = withModalContainer(ModalContent);

export default Modal;
