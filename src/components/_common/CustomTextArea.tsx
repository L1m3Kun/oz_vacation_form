import { ComponentPropsWithoutRef } from "react";
import { withLabelTextArea } from "../../HOCs";

export interface CustomTextAreaProps
  extends ComponentPropsWithoutRef<"textarea"> {
  htmlFor: string;
}

const TextArea = ({ htmlFor, ...rest }: CustomTextAreaProps) => {
  return <textarea id={htmlFor} {...rest}></textarea>;
};

export const CustomTextArea = withLabelTextArea(TextArea);
