import { ComponentPropsWithoutRef } from "react";

interface CustomButtonProps extends ComponentPropsWithoutRef<"button"> {
  mode: "outline" | "default" | "custom";
}

const DEFAULT_CLASS_NAME =
  "flex flex-col items-center justify-center rounded-md min-w-20 bg-purple-600 min-h-6 px-4 py-2 font-semibold shadow-lg border-solid border-fuchsia-900 hover:bg-purple-800 disabled:text-gray-400 disabled:bg-gray-700";

const OUTLINE_CLASS_NAME =
  "rounded-md min-w-20 min-h-6 px-4 py-2 border-solid border hover:bg-gray-700 disabled:border-gray-500 disabled:bg-none";

const CustomButton = ({
  mode,
  children,
  className,
  ...rest
}: CustomButtonProps) => {
  switch (mode) {
    case "custom":
      return (
        <button className={className} {...rest}>
          {children}
        </button>
      );
    case "outline":
      return (
        <button className={OUTLINE_CLASS_NAME + " " + className} {...rest}>
          {children}
        </button>
      );
    default:
      return (
        <button className={DEFAULT_CLASS_NAME + " " + className} {...rest}>
          {children}
        </button>
      );
  }
};

export default CustomButton;
