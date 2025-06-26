import { useCallback, useEffect, useState } from "react";

import { calculateMinBirth } from "../../utils/calculateMinBirth";
import { dateFormatting } from "../../utils";
import { useVacation } from "../../context";

export interface ErrorMessageObject {
  track: string;
  name: string;
  flag: string;
  birth: string;
  duringTo: string;
  duringFrom: string;
}

export interface UserValidations {
  track: boolean;
  name: boolean;
  birth: boolean;
  flag: boolean;
}
export interface VacationValidations {
  duringFrom: boolean;
  duringTo: boolean;
}
const ERROR_MESSAGE = {
  required: "필수 사항입니다.",
  duringDate: "휴가 시작일은 휴가 종료일 보다 앞서야합니다.",
  minDate: "유효하지 않은 날짜입니다. 날짜를 확인해주세요.",
};

const USER_DEFAULT_VALIDATIONS: UserValidations = {
  track: false,
  name: false,
  birth: false,
  flag: false,
};
const VACATION_DEFAULT_VALIDATIONS: VacationValidations = {
  duringFrom: false,
  duringTo: false,
};

export const useValidate = () => {
  const [userValid, setUserValid] = useState<UserValidations>(
    USER_DEFAULT_VALIDATIONS
  );
  const [vacationValid, setVacationValid] = useState<VacationValidations>(
    VACATION_DEFAULT_VALIDATIONS
  );

  const { track, name, birth, flag, duringFrom, duringTo } = useVacation();

  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    track: "",
    name: "",
    flag: "",
    birth: "",
    duringFrom: "",
    duringTo: "",
  });

  const validateRequired = useCallback((objKey: string, objValue: string) => {
    if (objValue && objValue !== "") {
      setErrorMessage((prev) => ({
        ...prev,
        [objKey + "Error"]: "",
      }));
      if (objKey in userValid) {
        setUserValid((prev) => ({ ...prev, [objKey]: true }));
      } else {
        setVacationValid((prev) => ({ ...prev, [objKey]: true }));
      }
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        [objKey + "Error"]: ERROR_MESSAGE.required,
      }));
      if (objKey in userValid) {
        setUserValid((prev) => ({ ...prev, [objKey]: false }));
      } else {
        setVacationValid((prev) => ({ ...prev, [objKey]: false }));
      }
    }
  }, []);

  const validateDate = (from: Date | string, to: Date | string) => {
    const [duringFrom, duringTo] = [new Date(from ?? ""), new Date(to ?? "")];
    if (duringFrom.getTime() > duringTo.getTime()) {
      setErrorMessage((prev) => ({
        ...prev,
        duringToError: ERROR_MESSAGE.duringDate,
        duringFromError: ERROR_MESSAGE.duringDate,
      }));
      setVacationValid((prev) => ({
        ...prev,
        duringFrom: false,
        duringTo: false,
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        duringToError: "",
        duringFromError: "",
      }));
      setVacationValid((prev) => ({
        ...prev,
        duringFrom: true,
        duringTo: true,
      }));
    }
  };

  const validate = useCallback(() => {
    Object.entries({ track, name, birth, flag, duringFrom, duringTo }).forEach(
      ([objKey, objValue]) => {
        const errorName = `${objKey}Error`;
        validateRequired(objKey, objValue.toString());
        switch (objKey) {
          case "track":
            if (objValue === "------ 트랙 선택 ------") {
              setErrorMessage((prev) => ({
                ...prev,
                [errorName]: ERROR_MESSAGE.required,
              }));
              setUserValid((prev) => ({ ...prev, track: false }));
            } else {
              setErrorMessage((prev) => ({
                ...prev,
                [errorName]: "",
              }));
              setUserValid((prev) => ({ ...prev, track: true }));
            }
            break;
          case "birth":
            const validatee = new Date(objValue);
            const today = new Date(Date.now());

            const { minBirthText } = calculateMinBirth();
            const standard = new Date(minBirthText);
            if (validatee >= standard) {
              setErrorMessage((prev) => ({
                ...prev,
                [errorName]: ERROR_MESSAGE.minDate,
              }));
              setUserValid((prev) => ({ ...prev, birth: false }));
            } else if (dateFormatting(validatee) === dateFormatting(today)) {
              setErrorMessage((prev) => ({
                ...prev,
                [errorName]: ERROR_MESSAGE.required,
              }));
              setUserValid((prev) => ({ ...prev, birth: false }));
            } else {
              setErrorMessage((prev) => ({
                ...prev,
                [errorName]: "",
              }));
              setUserValid((prev) => ({ ...prev, birth: true }));
            }
            break;
          case "duringFrom":
            validateDate(duringFrom, duringTo);
            break;
          case "duringTo":
            validateDate(duringFrom, duringTo);
            break;
          default:
            break;
        }
      }
    );
  }, [track, name, birth, flag, duringFrom, duringTo, validateRequired]);
  const canvasValidate = (currentCanvas?: HTMLCanvasElement) => {
    if (currentCanvas) {
      return (currentCanvas.getContext("2d") as CanvasRenderingContext2D)
        .getImageData(0, 0, currentCanvas.width, currentCanvas.height)
        .data.some((channel) => channel !== 0);
    } else {
      return false;
    }
  };

  useEffect(() => {
    validate();
  }, [validate]);

  return { userValid, vacationValid, errorMessage, validate, canvasValidate };
};
