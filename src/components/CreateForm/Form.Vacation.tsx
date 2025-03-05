import { ErrorMessageComponent } from "../../common/withErrorMessage";
import Description from "../../common/Description";
import Title from "../../common/Title";
import PageButtons, { PageButtonsProps } from "../../common/PageButtons";

import { useVacation } from "../../context/VacationContext";
import dateFormatting from "../../util/dateFormat";
import CustomInput from "../../common/CustomInput";
import useValidate from "./useValidate";

const FormVacation = ({
  prevAction,
  nextAction,
  isValid,
}: Pick<PageButtonsProps, "prevAction" | "nextAction" | "isValid">) => {
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const { errorMessage, validateDate, validateRequired } = useValidate({});
  const INPUT_ELEMENTS: ErrorMessageComponent[] = [
    {
      htmlFor: "duringFrom",
      labelText: "휴가 시작일*",
      type: "date",
      value: dateFormatting(value.duringFrom),
      max: "9999-12-31",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "duringError");
        validateDate({ from: new Date((e.target as HTMLInputElement).value) });
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringError,
    },
    {
      htmlFor: "duringTo",
      labelText: "휴가 종료일*",
      type: "date",
      value: dateFormatting(value.duringTo),
      max: "9999-12-31",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "duringError");
        validateDate({ to: new Date((e.target as HTMLInputElement).value) });
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringError,
    },
    {
      htmlFor: "writedAt",
      labelText: "작성일(기본: 당일)*",
      type: "date",
      max: "9999-12-31",
      value: dateFormatting(value.writedAt),
      onChange: handleChangeInput<HTMLInputElement>,
    },
    {
      htmlFor: "reason",
      labelText: "휴가 사유(선택)",
      type: "text",
      placeholder: "개인 사정으로 인한 휴가",
      value: value.reason,
      onChange: handleChangeInput<HTMLInputElement>,
    },
  ];
  return (
    <section className="h-screen w-full mx-auto flex flex-col justify-center items-center gap-2">
      <Title>휴가 정보 입력</Title>
      <Description>해당 정보는 휴가 신청서 작성 시에만 사용됩니다.</Description>
      {INPUT_ELEMENTS.map((el) => (
        <CustomInput key={el.htmlFor} {...el} />
      ))}
      <PageButtons
        mode="both"
        prevAction={prevAction}
        nextAction={nextAction}
        isValid={isValid}
      />
    </section>
  );
};

export default FormVacation;
