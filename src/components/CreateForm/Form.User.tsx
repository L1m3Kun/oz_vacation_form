import CustomSelect from "../../common/CustomSelect";
import CustomInput from "../../common/CustomInput";
import Title from "../../common/Title";
import Description from "../../common/Description";
import PageButtons, { PageButtonsProps } from "../../common/PageButtons";
import { LabelComponentWithInput } from "../../common/withLabel";

import useValidate from "./useValidate";
import dateFormatting from "../../util/dateFormat";
import { useVacation } from "../../context/VacationContext";
import { useModal } from "../../context/ModalContext";

const FormUser = ({
  prevAction,
  nextAction,
  isValid,
}: Pick<PageButtonsProps, "prevAction" | "nextAction" | "isValid">) => {
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const { errorMessage, validate } = useValidate();
  const { openModal, closeModal } = useModal();
  const handleNextAction = () => {
    if (isValid) {
      if (nextAction) {
        nextAction();
      }
    } else {
      const userInValidKey = "userInValid";
      validate();
      openModal({
        modalKey: userInValidKey,
        type: "alert",
        onConfirm: () => closeModal(userInValidKey),
        title: "⚠️ 오류 ⚠️",
        content: "입력 값을 확인해주세요.",
      });
    }
  };
  const INPUT_ELEMENTS: LabelComponentWithInput[] = [
    {
      htmlFor: "name",
      isRequire: true,
      labelText: "이름",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      value: value.name,
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.nameError,
    },
    {
      htmlFor: "birth",
      isRequire: true,
      labelText: "생년월일",
      type: "date",
      max: dateFormatting(new Date(Date.now()).toString()),
      value: dateFormatting(value.birth),
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.birthError,
    },
    {
      htmlFor: "flag",
      isRequire: true,
      labelText: "차수(기수)",
      type: "number",
      value: value.flag,
      onWheel: (event) => (event.target as HTMLInputElement).blur(),
      min: 1,
      placeholder: "예시) 7기(7차수) -> 7",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.flagError,
    },
  ];
  return (
    <section className="h-screen w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-2 px-2">
      <Title>수강생 정보 입력</Title>
      <Description>해당 정보는 휴가 신청서 작성 시에만 사용됩니다.</Description>
      <CustomSelect
        htmlFor="track"
        labelText="캠프명"
        errorMessage={errorMessage.trackError}
        isRequire={true}
      />
      {INPUT_ELEMENTS.map((el) => (
        <CustomInput key={el.htmlFor} {...el} />
      ))}
      <PageButtons
        mode="both"
        prevAction={prevAction}
        nextAction={handleNextAction}
        isValid={true}
      />
    </section>
  );
};

export default FormUser;
