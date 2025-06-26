import { ComponentType } from "react";
import { SelectProps } from "../components/_common/CustomSelect";
import { CustomInputProps } from "../components/_common/CustomInput";

export interface ErrorMessageComponentWithInput extends CustomInputProps {
  errorMessage?: string;
}
export interface ErrorMessageComponentWithSelect extends SelectProps {
  errorMessage?: string;
}

export const withErrorMessageInput = (
  WrappedComponent: ComponentType<ErrorMessageComponentWithInput>
) => {
  return ({ errorMessage = "", ...rest }: ErrorMessageComponentWithInput) => {
    return (
      <div className="w-full">
        <WrappedComponent {...rest} />
        <p className="text-red-400 w-full max-w-sm min-h-6 mx-auto pt-1 pl-2 font-semibold text-sm">
          {errorMessage}
        </p>
      </div>
    );
  };
};

export const withErrorMessageSelect = (
  WrappedComponent: ComponentType<ErrorMessageComponentWithSelect>
) => {
  return ({ errorMessage = "", ...rest }: ErrorMessageComponentWithSelect) => {
    return (
      <div className="w-full">
        <WrappedComponent {...rest} />
        <p className="text-red-400 w-full max-w-sm min-h-6 mx-auto pt-1 pl-2 font-semibold text-sm">
          {errorMessage}
        </p>
      </div>
    );
  };
};
