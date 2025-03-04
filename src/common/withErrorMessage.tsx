import { ComponentType } from "react";
import { LabelComponentWithInput } from "./withLabel";

export interface ErrorMessageComponent extends LabelComponentWithInput {
  errorMessage?: string;
}

const withErrorMessageInput = (
  WrappedComponent: ComponentType<ErrorMessageComponent>
) => {
  return ({ errorMessage = "", ...rest }: ErrorMessageComponent) => {
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

export default withErrorMessageInput;
