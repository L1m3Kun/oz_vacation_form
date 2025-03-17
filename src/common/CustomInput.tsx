import { ComponentPropsWithoutRef } from "react";
import { withLabelInput } from "./withLabel";
import { withErrorMessageInput } from "./withErrorMessage";

export interface CustomInputProps extends ComponentPropsWithoutRef<"input"> {
  htmlFor: string;
}

const CInput = ({ htmlFor, ...rest }: CustomInputProps) => {
  return (
    <input
      className="text-black w-full text-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 placeholder-gray-400"
      id={htmlFor}
      {...rest}
    />
  );
};

const CustomInput = withLabelInput(withErrorMessageInput(CInput));

export default CustomInput;
