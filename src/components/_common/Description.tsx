import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface DescriptionProps extends PropsWithChildren {
  className?: string;
}

export const Description = ({ children, className = "" }: DescriptionProps) => {
  return (
    <p className={twMerge("text-xs font-normal text-gray-500 pb-8", className)}>
      {children}
    </p>
  );
};
