import { WheelEvent } from "react";

import { ErrorMessageObject } from "../../../hooks";
import { dateFormatting } from "../../../utils";
import { LabelComponentWithInput } from "../../../HOCs";

export interface UserFormConfigType
  extends Omit<LabelComponentWithInput, "htmlFor"> {
  htmlFor: keyof ErrorMessageObject;
}

export const USER_FORM_CONFIGS: UserFormConfigType[] = [
  {
    htmlFor: "name",
    isRequire: true,
    labelText: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요.",
  },
  {
    htmlFor: "birth",
    isRequire: true,
    labelText: "생년월일",
    type: "date",
    max: dateFormatting(new Date(Date.now()).toString()),
  },
  {
    htmlFor: "flag",
    isRequire: true,
    labelText: "차수(기수)",
    type: "number",
    onWheel: (event: WheelEvent<HTMLInputElement>) =>
      (event.target as HTMLInputElement).blur(),
    min: 1,
    placeholder: "예시) 7기 -> 7",
  },
];
