import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useVacation } from "../context/VacationContext";
import SignatureCanvas from "../Canvas/SignatureCanvas";
import LogoImage from "../assets/images/오즈_라이트.png";
import localStorageUtils from "../util/localStorageUtils";

import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import useValidate from "./useValidate";

const INPUT_ELEMENTS = [
  {
    htmlFor: "name",
    labelText: "이름*",
    type: "text",
    placeholder: "이름을 입력해주세요.",
  },
  { htmlFor: "birth", labelText: "생년월일", type: "date" },
  {
    htmlFor: "flag",
    labelText: "기수*",
    type: "text",
    placeholder: "예시) 7기 -> 7",
  },
  {
    htmlFor: "duringFrom",
    labelText: "휴가 시작일*",
    type: "date",
    max: "9999-12-31",
  },
  {
    htmlFor: "duringTo",
    labelText: "휴가 종료일*",
    type: "date",
    max: "9999-12-31",
  },
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

interface ErrorMessageObject {
  nameError: string;
  flagError: string;
  duringFromError: string;
  duringToError: string;
}

const CreatingForm = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const { isValidate, validating } = useValidate();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageObject>({
    nameError: "",
    flagError: "",
    duringToError: "",
    duringFromError: "",
  });

  const createVacationForm = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const canvasCurrent = canvasRef.current;
    if (canvasCurrent) {
      const url = canvasCurrent.toDataURL();
      handleSignUrl(url);

      navigate("/preview");
    } else {
      console.error("canvasCurrent 없음");
    }
  };

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
          <CustomInput
            key={el.htmlFor}
            {...el}
            onChange={handleChangeInput<HTMLInputElement>}
          />
        ))}
        <SignatureCanvas reff={canvasRef} />
        <button
          type="submit"
          id="submit"
          className="p-4 text-center max-w-sm rounded-md border-solid border-white border-2 cursor-pointer hover:opacity-70 mx-auto"
        >
          휴가 신청서 만들기
        </button>
      </div>
    </form>
  );
};

export default CreatingForm;
