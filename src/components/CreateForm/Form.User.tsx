import CustomSelect from "../../common/CustomSelect";
import CustomInput from "../../common/CustomInput";
import { ErrorMessageComponent } from "../../common/withErrorMessage";
import Title from "../../common/Title";
import Description from "../../common/Description";
import PageButtons, { PageButtonsProps } from "../../common/PageButtons";

import useValidate from "./useValidate";
import { useVacation } from "../../context/VacationContext";
import dateFormatting from "../../util/dateFormat";

const FormUser = ({
  prevAction,
  nextAction,
  isValid,
}: Pick<PageButtonsProps, "prevAction" | "nextAction" | "isValid">) => {
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const { errorMessage, validateRequired } = useValidate({});

  const INPUT_ELEMENTS: ErrorMessageComponent[] = [
    {
      htmlFor: "name",
      labelText: "이름*",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      value: value.name,
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "nameError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.nameError,
    },
    {
      htmlFor: "birth",
      labelText: "생년월일*",
      type: "date",
      max: "9999-12-31",
      value: dateFormatting(value.birth),
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "birthError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.birthError,
    },
    {
      htmlFor: "flag",
      labelText: "차수(기수)*",
      type: "number",
      value: value.flag,
      onWheel: (event) => (event.target as HTMLInputElement).blur(),
      min: 1,
      placeholder: "예시) 7기(7차수) -> 7",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "flagError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.flagError,
    },
  ];
  return (
    <section className="h-screen w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-2">
      <Title>수강생 정보 입력</Title>
      <Description>해당 정보는 휴가 신청서 작성 시에만 사용됩니다.</Description>
      <CustomSelect htmlFor="track" labelText="캠프명*" />
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

export default FormUser;
