import {
  CustomInput,
  Description,
  PageButtons,
  PageButtonsProps,
  Title,
} from "../_common";
import { useModal, useVacation } from "../../context";
import { changeTwoDay, dateFormatting, getDateDiff } from "../../utils";
import { INPUT_CONFIGS, VACATION_DATE_COFIGS } from "../../assets/configs";
import { useValidate } from "../../hooks";

export const FormVacation = ({
  prevAction,
  nextAction,
  isValid,
}: Pick<PageButtonsProps, "prevAction" | "nextAction" | "isValid">) => {
  const { handleChangeInput, duringFrom, duringTo, writedAt, reason } =
    useVacation();
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

  const VACATION_DATE_ELEMENTS = VACATION_DATE_COFIGS.map((config) => ({
    ...config,
    value: { duringFrom, duringTo }[config.htmlFor].toString(),
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      handleChangeInput<HTMLInputElement>(e);
    },
    errorMessage: errorMessage[config.htmlFor],
  }));
  const INPUT_ELEMENTS = INPUT_CONFIGS.map((config) => ({
    ...config,
    value: config.htmlFor === "writedAt" ? dateFormatting(writedAt) : reason,
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      handleChangeInput<HTMLInputElement>(e);
    },
  }));

  return (
    <section className="h-screen w-full mx-auto flex flex-col justify-center items-center gap-2 px-2">
      <Title>휴가 정보 입력</Title>
      <Description>해당 정보는 휴가 신청서 작성 시에만 사용됩니다.</Description>
      <div className="w-full flex items-center justify-between gap-10 max-w-sm">
        {VACATION_DATE_ELEMENTS.map((el) => (
          <CustomInput key={el.htmlFor} {...el} />
        ))}
      </div>
      <p className="text-2xl font-semibold pb-2 text-green-600">{`${new Date(
        duringFrom
      ).getFullYear()}.${changeTwoDay(
        new Date(duringFrom).getMonth() + 1
      )}.${changeTwoDay(new Date(duringFrom).getDate())} ~ ${new Date(
        duringTo
      ).getFullYear()}.${changeTwoDay(
        new Date(duringTo).getMonth() + 1
      )}.${changeTwoDay(new Date(duringTo).getDate())}(${Math.floor(
        getDateDiff({
          duringFrom: new Date(duringFrom),
          duringTo: new Date(duringTo),
        })
      )}일)`}</p>
      {INPUT_ELEMENTS.map((el) => (
        <CustomInput key={el.htmlFor} {...el} />
      ))}
      <PageButtons
        mode="both"
        prevAction={prevAction}
        nextAction={handleNextAction}
      />
    </section>
  );
};
