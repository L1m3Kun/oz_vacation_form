import { useCallback, useState } from "react";
import { InputValueType } from "../../context";
import { ERROR_MESSAGE } from "../../assets/configs/forms/errorMessage";

interface ErrorMessageObject {
  duringFrom: string;
  duringTo: string;
}
export const useVacationValidate = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    duringFrom: "",
    duringTo: "",
  });

  const vacationValidate = useCallback(
    ({
      duringFrom,
      duringTo,
    }: Pick<InputValueType, "duringFrom" | "duringTo">) => {
      const [from, to] = [new Date(duringFrom ?? ""), new Date(duringTo ?? "")];

      if (!from.getTime() || duringFrom === "") {
        setErrorMessage((prev) => ({
          ...prev,
          duringFrom: ERROR_MESSAGE.required,
        }));

        return [false, "휴가 시작일은 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        duringFrom: "",
      }));
      if (!to.getTime() || duringTo === "") {
        setErrorMessage((prev) => ({
          ...prev,
          duringTo: ERROR_MESSAGE.required,
        }));

        return [false, "휴가 종료일은 필수 항목입니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        duringTo: "",
      }));
      if (from.getTime() > to.getTime()) {
        setErrorMessage((prev) => ({
          ...prev,
          duringTo: ERROR_MESSAGE.duringDate,
          duringFrom: ERROR_MESSAGE.duringDate,
        }));

        return [false, "휴가 시작일은 휴가 종료일 보다 앞서야합니다."];
      }
      setErrorMessage((prev) => ({
        ...prev,
        duringTo: "",
        duringFrom: "",
      }));

      return [true, ""];
    },
    [setErrorMessage]
  );

  return { errorMessage, vacationValidate };
};
