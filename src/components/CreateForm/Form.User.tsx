import useValidate from "./useValidate";
import { useModal, useVacation } from "../../context";
import {
  CustomInput,
  CustomSelect,
  Description,
  PageButtons,
  PageButtonsProps,
  Title,
} from "../../common";
import { dateFormatting } from "../../utils";
import { USER_FORM_CONFIGS, UserFormConfigType } from "../../assets/configs";

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

  const INPUT_ELEMENTS: UserFormConfigType[] = USER_FORM_CONFIGS.map(
    (config) => ({
      ...config,
      value:
        config.htmlFor === "birth"
          ? dateFormatting(value.birth)
          : value[config.htmlFor].toString(),
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage[config.htmlFor],
    })
  );
  return (
    <section className="h-screen w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-2 px-2">
      <Title>수강생 정보 입력</Title>
      <Description>해당 정보는 휴가 신청서 작성 시에만 사용됩니다.</Description>
      <CustomSelect
        htmlFor="track"
        labelText="캠프명"
        errorMessage={errorMessage.track}
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
