import LabeledInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { useVacation } from "../context/VacationContext";
import SignatureCanvas from "../Canvas/SignatureCanvas";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const INPUT_ELEMENTS = [
  {
    htmlFor: "name",
    labelText: "이름",
    type: "text",
    placeholder: "이름을 입력해주세요.",
  },
  { htmlFor: "birth", labelText: "생년월일", type: "date" },
  {
    htmlFor: "flag",
    labelText: "기수",
    type: "text",
    placeholder: "예시) 7기 -> 7",
  },
  { htmlFor: "duringFrom", labelText: "휴가 시작일", type: "date" },
  { htmlFor: "duringTo", labelText: "휴가 종료일", type: "date" },
  {
    htmlFor: "writedAt",
    labelText: "작성일",
    type: "date",
  },
  {
    htmlFor: "reason",
    labelText: "휴가 사유(선택)",
    type: "text",
    placeholder: "개인 사정으로 인한 휴가",
  },
];

const CreatingForm = () => {
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const createVacationForm = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const canvasCurrent = canvasRef.current;
    if (canvasCurrent) {
      const url = canvasCurrent.toDataURL();
      handleSignUrl(url);
      console.log(value);
      console.log(url);
      navigate("/preview");
    }
  };

  return (
    <form onSubmit={createVacationForm}>
      <h1 className="text-center my-8 font-extrabold text-2xl">
        OZ 휴가 신청서
      </h1>
      <div className="flex flex-col gap-3">
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
          <LabeledInput
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
