import Description from "../../common/Description";
import Title from "../../common/Title";
import PageButtons, { PageButtonsProps } from "../../common/PageButtons";
import { LabelComponentWithInput } from "../../common/withLabel";

import { useVacation } from "../../context/VacationContext";
import dateFormatting from "../../util/dateFormat";
import CustomInput from "../../common/CustomInput";
import useValidate from "./useValidate";
import { useModal } from "../../context/ModalContext";
import changeTwoDay from "../../util/chageTwoDay";
import getDateDiff from "../../util/getDateDiff";

const FormVacation = ({
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

  const VACATION_DATE_ELEMENTS: LabelComponentWithInput[] = [
    {
      htmlFor: "duringFrom",
      isRequire: true,
      labelText: "휴가 시작일",
      type: "date",
      value: dateFormatting(duringFrom),
      max: "9999-12-31",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringFromError,
    },
    {
      htmlFor: "duringTo",
      isRequire: true,
      labelText: "휴가 종료일",
      type: "date",
      value: dateFormatting(duringTo),
      max: "9999-12-31",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringToError,
    },
  ];
  const INPUT_ELEMENTS: LabelComponentWithInput[] = [
    {
      htmlFor: "writedAt",
      labelText: "작성일(기본: 당일)",
      type: "date",
      value: dateFormatting(writedAt),
      max: "9999-12-31",
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
    },
    {
      htmlFor: "reason",
      labelText: "휴가 사유(선택)",
      type: "text",
      placeholder: "개인 사정으로 인한 휴가",
      value: reason,
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChangeInput<HTMLInputElement>(e);
      },
    },
  ];

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

export default FormVacation;
