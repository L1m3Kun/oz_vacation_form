import { ComponentPropsWithRef, ComponentType } from "react";

interface CustomInputProps extends ComponentPropsWithRef<"input"> {
  htmlFor: string;
}

const CustomInput = ({ placeholder, htmlFor, ...rest }: CustomInputProps) => {
  return (
    <input
      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
      id={htmlFor}
      placeholder={placeholder}
      {...rest}
    />
  );
};

interface LabelComponent extends CustomInputProps {
  labelText: string;
  htmlFor: string;
}

const withLabel = (WrappedComponent: ComponentType<CustomInputProps>) => {
  return ({ labelText, htmlFor, placeholder, ...rest }: LabelComponent) => {
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

const LabeledInput = withLabel(CustomInput);

export default LabeledInput;
