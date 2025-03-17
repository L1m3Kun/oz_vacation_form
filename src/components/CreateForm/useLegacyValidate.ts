import { useCallback, useEffect, useState } from "react";
import { useVacation } from "../../context/VacationContext";

type ValidateDateParams = {
  from?: Date | string;
  to?: Date | string;
};

interface ErrorMessageObject {
  nameError: string;
  flagError: string;
  birthError: string;
  duringError: string;
}

interface Validations {
  userValid: boolean;
  vacationValid: boolean;
  canvasValid: boolean;
}

const ERROR_MESSAGE = {
  required: "필수 사항입니다.",
  duringDate: "휴가 시작일은 휴가 종료일 보다 앞서야합니다.",
};

const DEFAULT_VALIDATIONS: Validations = {
  userValid: false,
  vacationValid: false,
  canvasValid: false,
};

interface ValidateParams {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

const useValidate = ({ canvasRef }: ValidateParams) => {
  const [isValid, setIsValid] = useState<Validations>(DEFAULT_VALIDATIONS);
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    nameError: "",
    flagError: "",
    birthError: "",
    duringError: "",
  });

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
    const [duringFrom, duringTo] = [new Date(from ?? ""), new Date(to ?? "")];
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

  const handleValidations = (valids: Partial<Validations>) => {
    setIsValid((prev) => ({ ...prev, ...valids }));
  };

  const isCanvasValid = (currentCanvas?: HTMLCanvasElement) => {
    if (currentCanvas) {
      return (currentCanvas.getContext("2d") as CanvasRenderingContext2D)
        .getImageData(0, 0, currentCanvas.width, currentCanvas.height)
        .data.some((channel) => channel !== 0);
    } else {
      return false;
    }
  };
  const validate = useCallback(() => {
    handleValidations({
      userValid: [value.birth, value.flag, value.name].every((v) => !!v),
      vacationValid: [value.duringFrom, value.duringTo].every((v) => !!v),
    });
  }, [value.birth, value.duringFrom, value.duringTo, value.flag, value.name]);
  useEffect(() => {
    validate();
  }, [canvasRef, validate]);

  return {
    isValid,
    errorMessage,
    validateDate,
    validateRequired,
    isCanvasValid,
    validate,
  };
};

export default useValidate;
