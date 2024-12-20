import { useEffect, useState } from "react";
import { useVacation } from "../context/VacationContext";

type ValidateDateParams = {
  from?: Date;
  to?: Date;
};
interface ErrorMessageObject {
  nameError: string;
  flagError: string;
  birthError: string;
  duringError: string;
}

const ERROR_MESSAGE = {
  required: "필수 사항입니다.",
  duringDate: "휴가 시작일은 휴가 종료일 보다 앞서야합니다.",
};

const useValidate = () => {
  const [isValid, setIsValid] = useState(false);
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    nameError: "",
    flagError: "",
    birthError: "",
    duringError: "",
  });

  const isCanvasBlank = (canvas: HTMLCanvasElement) => {
    return (canvas.getContext("2d") as CanvasRenderingContext2D)
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel) => channel !== 0);
  };

  const validateRequired = (value: string, errorType: string) => {
    if (value === "") {
      setErrorMessage((prev) => ({
        ...prev,
        [errorType]: ERROR_MESSAGE.required,
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        [errorType]: "",
      }));
    }
  };

  const validateDate = ({
    from = value.duringFrom,
    to = value.duringTo,
  }: ValidateDateParams) => {
    const [duringFrom, duringTo] = [new Date(from), new Date(to)];
    if (duringFrom.getTime() > duringTo.getTime()) {
      setErrorMessage((prev) => ({
        ...prev,
        duringError: ERROR_MESSAGE.duringDate,
      }));
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        duringError: "",
      }));
    }
  };

  useEffect(() => {
    const validate = () => {
      setIsValid(
        [
          value.birth,
          value.duringFrom,
          value.duringTo,
          value.flag,
          value.name,
        ].every((v) => !!v)
      );
    };
    validate();
  }, [value.birth, value.duringFrom, value.duringTo, value.flag, value.name]);

  return {
    isValid,
    errorMessage,
    validateDate,
    validateRequired,
    isCanvasBlank,
  };
};

export default useValidate;
