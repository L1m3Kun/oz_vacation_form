import { PropsWithChildren } from "react";

const Description = ({ children }: PropsWithChildren) => {
  return <p className="text-xs font-normal text-gray-500 pb-8">{children}</p>;
};

export default Description;
