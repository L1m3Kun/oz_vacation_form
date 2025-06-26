import { twMerge } from "tailwind-merge";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Default_Class_Name = "text-2xl font-bold";

export const Title = ({ className, children }: TitleProps) => {
  return <h1 className={twMerge(Default_Class_Name, className)}>{children}</h1>;
};
