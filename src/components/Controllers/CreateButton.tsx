import { ComponentPropsWithoutRef } from "react";
import { CustomButton } from "../../common";

interface CreateButtonProps extends ComponentPropsWithoutRef<"button"> {}

const CreateButton = ({ className, ...rest }: CreateButtonProps) => {
  return (
    <CustomButton
      mode="custom"
      className={
        "p-4 text-center max-w-sm rounded-md border-solid border-white border-2 cursor-pointer hover:opacity-70 mx-auto  disabled:cursor-not-allowed disabled:opacity-75 disabled:border-opacity-75" +
        className
      }
      {...rest}
    >
      휴가 신청서 만들기
    </CustomButton>
  );
};

export default CreateButton;
