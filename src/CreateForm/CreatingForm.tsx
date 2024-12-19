import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useVacation } from "../context/VacationContext";
import SignatureCanvas from "../Canvas/SignatureCanvas";
import localStorageUtils from "../util/localStorageUtils";
import LOCALSTORAGE_KEY from "../util/localStorageKey";

import CustomSelect from "./CustomSelect";
import CustomInput, { ErrorMessageComponent } from "./CustomInput";

import LogoImage from "../assets/images/오즈_라이트.png";
import dateFormatting from "../util/dateFormat";

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

const CreatingForm = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const { setItemToLocalStorage } = localStorageUtils();
  const [isValid, setIsValid] = useState(false);
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
  type ValidateDateParams = {
    from?: Date;
    to?: Date;
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

  const isCanvasBlank = (canvas: HTMLCanvasElement) => {
    return (canvas.getContext("2d") as CanvasRenderingContext2D)
      .getImageData(0, 0, canvas.width, canvas.height)
      .data.some((channel) => channel !== 0);
  };

  const createVacationForm = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const canvasCurrent = canvasRef.current;
    if (canvasCurrent) {
      if (isCanvasBlank(canvasCurrent)) {
        const url = canvasCurrent.toDataURL();

        handleSignUrl(url);
        setItemToLocalStorage(LOCALSTORAGE_KEY.vacationData, {
          ...value,
          signUrl: url,
        });
        navigate("/preview");
      } else {
        alert("서명이 비어있습니다.");
      }
    } else {
      console.error("canvasCurrent 없음");
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

  const INPUT_ELEMENTS: ErrorMessageComponent[] = [
    {
      htmlFor: "name",
      labelText: "이름*",
      type: "text",
      placeholder: "이름을 입력해주세요.",
      value: value.name,
      onChange(e: ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "nameError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.nameError,
    },
    {
      htmlFor: "birth",
      labelText: "생년월일",
      type: "date",
      max: "9999-12-31",
      value: dateFormatting(value.birth),
      onChange(e: ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "birthError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.birthError,
    },
    {
      htmlFor: "flag",
      labelText: "기수*",
      type: "number",
      value: value.flag,
      placeholder: "예시) 7기 -> 7",
      onChange(e: ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "flagError");
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.flagError,
    },
    {
      htmlFor: "duringFrom",
      labelText: "휴가 시작일*",
      type: "date",
      value: dateFormatting(value.duringFrom),
      max: "9999-12-31",
      onChange(e: ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "duringError");
        validateDate({ from: new Date((e.target as HTMLInputElement).value) });
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringError,
    },
    {
      htmlFor: "duringTo",
      labelText: "휴가 종료일*",
      type: "date",
      value: dateFormatting(value.duringTo),
      max: "9999-12-31",
      onChange(e: ChangeEvent<HTMLInputElement>) {
        validateRequired((e.target as HTMLInputElement).value, "duringError");
        validateDate({ to: new Date((e.target as HTMLInputElement).value) });
        handleChangeInput<HTMLInputElement>(e);
      },
      errorMessage: errorMessage.duringError,
    },
    {
      htmlFor: "writedAt",
      labelText: "작성일(기본: 당일)",
      type: "date",
      max: "9999-12-31",
      value: dateFormatting(value.writedAt),
      onChange: handleChangeInput<HTMLInputElement>,
    },
    {
      htmlFor: "reason",
      labelText: "휴가 사유(선택)",
      type: "text",
      placeholder: "개인 사정으로 인한 휴가",
      value: value.reason,
      onChange: handleChangeInput<HTMLInputElement>,
    },
  ];

  return (
    <form onSubmit={createVacationForm} className="mx-auto">
      <h1 className="flex flex-wrap justify-center gap-3 text-center my-8 font-extrabold text-3xl">
        <img
          src={LogoImage}
          alt="로고"
          height={21}
          width={155}
          className="self-center block"
        />
        <p className="self-start">휴가 신청서</p>
      </h1>
      <div className="flex flex-col gap-3 align-middle">
        <div className="w-full max-w-sm mx-auto">
          <label htmlFor="track" className="pb-1">
            캠프명
          </label>
          <CustomSelect
            track={value.track}
            onChange={handleChangeInput<HTMLSelectElement>}
          />
        </div>
        {INPUT_ELEMENTS.map((el) => (
          <CustomInput key={el.htmlFor} {...el} />
        ))}
        <SignatureCanvas reff={canvasRef} />
        {/* <p>{errorMessage.signError}</p> */}
        <button
          type="submit"
          id="submit"
          className="p-4 text-center max-w-sm rounded-md border-solid border-white border-2 cursor-pointer hover:opacity-70 mx-auto  disabled:cursor-not-allowed disabled:opacity-75 disabled:border-opacity-75"
          disabled={!isValid}
        >
          휴가 신청서 만들기
        </button>
      </div>
    </form>
  );
};

export default CreatingForm;
