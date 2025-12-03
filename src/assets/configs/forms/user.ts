import { WheelEvent } from "react";

import { calculateMinBirth, dateFormatting } from "../../../utils";
import { LabelComponentWithInput } from "../../../HOCs";
import { InputValueType } from "../../../context";

interface UserFormConfigType extends Omit<LabelComponentWithInput, "htmlFor"> {
  htmlFor: keyof Pick<InputValueType, "name" | "birth" | "flag">;
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
    max: dateFormatting(new Date(calculateMinBirth().minBirthText + 1)),
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
