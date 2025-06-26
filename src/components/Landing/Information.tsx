import { twMerge } from "tailwind-merge";
import { Description, Title } from "../_common";

interface InfromationProps {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const CLASSNAME = {
  hilight: "font-bold text-orange-400",
  subLight: "text-fuchsia-300",
};

export const Information = ({
  className,
  descriptionClassName,
  titleClassName,
}: InfromationProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center max-w-[30rem] border-solid border-white border-2 rounded-xl py-4 px-4 gap-2 mx-4",
        className
      )}
    >
      <Title className={twMerge("text-green-500", titleClassName)}>
        🌟 알려드립니다 🌟
      </Title>
      <Description
        className={twMerge(
          "text-lg leading-tight pb-0 text-white ",
          descriptionClassName
        )}
      >
        <span className={CLASSNAME.hilight}>휴가신청서 제작기</span>는 입력하신
        내용을 기반으로{" "}
        <span className={CLASSNAME.hilight}>
          HRD 시스템에 등록된 공식 명칭과 회차 정보로 자동 변환
        </span>
        됩니다.
        <br />
        <br />
        <span className={CLASSNAME.subLight}>
          현재 수강 중인 과정과 기수를 선택
        </span>
        해 주시면, 해당 정보를 바탕으로{" "}
        <span className={CLASSNAME.subLight}>휴가신청서가 자동으로 변환</span>
        되므로, 직접 작성하신 내용과 일부 다를 수 있더라도 착오 없으시기
        바랍니다.
      </Description>
    </div>
  );
};
