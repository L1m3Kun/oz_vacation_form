import { ComponentType } from "react";
import { CustomInputProps } from "./CustomInput";
import { SelectProps } from "./CustomSelect";

export interface LabelComponentWithInput extends CustomInputProps {
  labelText: string;
  htmlFor: string;
}
export interface LabelComponentWithSelect extends SelectProps {
  labelText: string;
  htmlFor: string;
}
export const withLabelInput = (
  WrappedComponent: ComponentType<CustomInputProps>
) => {
  return ({
    labelText,
    htmlFor,
    placeholder,
    ...rest
  }: LabelComponentWithInput) => {
    return (
      <div className="w-full max-w-sm mx-auto">
        <label
          className="block text-sm font-medium text-white mb-1"
          htmlFor={htmlFor}
        >
          {labelText}
        </label>
        {
          <WrappedComponent
            htmlFor={htmlFor}
            placeholder={placeholder}
            {...rest}
          />
        }
      </div>
    );
  };
};

export const withLabelSelect = (
  WrappedComponent: ComponentType<SelectProps>
) => {
  return ({ labelText, htmlFor, ...rest }: LabelComponentWithSelect) => {
    return (
      <div className="w-full max-w-sm mx-auto pb-[1.45rem]">
        <label
          className="block text-sm font-medium text-white mb-1"
          htmlFor={htmlFor}
        >
          {labelText}
        </label>
        {<WrappedComponent htmlFor={htmlFor} {...rest} />}
      </div>
    );
  };
};
