import { useCallback, useState } from "react";
import { InputValueType } from "../../context";
import { calculateMinBirth } from "../../utils";
import { ERROR_MESSAGE } from "../../assets/configs/forms/errorMessage";

interface ErrorMessageObject {
  track: string;
  name: string;
  flag: string;
  birth: string;
}
export const useUserValidate = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    track: "",
    name: "",
    flag: "",
    birth: "",
  });
  const userValidate = useCallback(
    ({
      track,
      name,
      birth,
      flag,
    }: Pick<InputValueType, "track" | "name" | "birth" | "flag">) => {
      if (track === "------ 트랙 선택 ------") {
        setErrorMessage((prev) => ({
          ...prev,
          track: ERROR_MESSAGE.required,
        }));

        return [false, "캠프명은 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        track: "",
      }));

      if (!name || name === "") {
        setErrorMessage((prev) => ({ ...prev, name: ERROR_MESSAGE.required }));

        return [false, "이름은 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        name: "",
      }));
      if (!birth || birth === "") {
        setErrorMessage((prev) => ({ ...prev, birth: ERROR_MESSAGE.required }));

        return [false, "생년월일은 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        birth: "",
      }));

      if (birth > calculateMinBirth().minBirthText) {
        setErrorMessage((prev) => ({ ...prev, birth: ERROR_MESSAGE.minDate }));
        return [false, "나이를 확인해주세요."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        birth: "",
      }));
      if (!flag || flag === "") {
        setErrorMessage((prev) => ({ ...prev, flag: ERROR_MESSAGE.required }));
        return [false, "기수(차수)는 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        flag: "",
      }));

      return [true, ""];
    },
    [setErrorMessage]
  );
  return { userValidate, errorMessage };
};
