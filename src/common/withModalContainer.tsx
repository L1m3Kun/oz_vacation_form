import { ComponentType } from "react";
import { ModalProps } from "../components/Modal/Modal";

const withModalContainer = (WrappedComponent: ComponentType<ModalProps>) => {
  return (rest: ModalProps) => {
    return (
      <div className="absolute top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-gray-700 bg-opacity-60">
        <WrappedComponent {...rest} />
      </div>
    );
  };
};

export default withModalContainer;
