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
  },
  {
    htmlFor: "duringTo",
    isRequire: true,
    labelText: "휴가 종료일",
    type: "date",
    max: "9999-12-31",
  },
];
export const INPUT_CONFIGS: LabelComponentWithInput[] = [
  {
    htmlFor: "writedAt",
    labelText: "작성일(기본: 당일)",
    type: "date",
    max: "9999-12-31",
  },
  {
    htmlFor: "reason",
    labelText: "휴가 사유(선택)",
    type: "text",
    placeholder: "개인 사정으로 인한 휴가",
  },
];
