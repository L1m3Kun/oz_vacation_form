import { LabelComponentWithInput } from "../../../common";

export interface VacationConfigType
  extends Omit<LabelComponentWithInput, "htmlFor"> {
  htmlFor: "duringFrom" | "duringTo";
}

export const VACATION_DATE_COFIGS: VacationConfigType[] = [
  {
    htmlFor: "duringFrom",
    isRequire: true,
    labelText: "휴가 시작일",
    type: "date",
    max: "9999-12-31",
    // value: dateFormatting(duringFrom),
    // onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //   handleChangeInput<HTMLInputElement>(e);
    // },
    // errorMessage: errorMessage.duringFrom,
  },
  {
    htmlFor: "duringTo",
    isRequire: true,
    labelText: "휴가 종료일",
    type: "date",
    max: "9999-12-31",
    // value: dateFormatting(duringTo),
    // onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //   handleChangeInput<HTMLInputElement>(e);
    // },
    // errorMessage: errorMessage.duringTo,
  },
];
export const INPUT_CONFIGS: LabelComponentWithInput[] = [
  {
    htmlFor: "writedAt",
    labelText: "작성일(기본: 당일)",
    type: "date",
    max: "9999-12-31",
    // value: dateFormatting(writedAt),
    // onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //   handleChangeInput<HTMLInputElement>(e);
    // },
  },
  {
    htmlFor: "reason",
    labelText: "휴가 사유(선택)",
    type: "text",
    placeholder: "개인 사정으로 인한 휴가",
    // value: reason,
    // onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //   handleChangeInput<HTMLInputElement>(e);
    // },
  },
];
