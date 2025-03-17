import { ComponentPropsWithoutRef } from "react";
import { useVacation } from "../context/VacationContext";
import { withLabelSelect } from "./withLabel";
import { withErrorMessageSelect } from "./withErrorMessage";

const TRACKS = [
  {
    id: "default",
    value: "------ 트랙 선택 ------",
  },
  {
    id: "FE",
    value: "초격차 웹 개발 캠프(프론트엔드)",
  },
  { id: "BE", value: "초격차 웹 개발 캠프(백엔드)" },
  { id: "FS", value: "관리형 웹 풀스택 부트캠프" },
  { id: "CEO", value: "CEO 개발부트캠프" },
  { id: "DS", value: "디자인 부트캠프" },
];

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  htmlFor: string;
}

export const Select = ({ htmlFor, ...rest }: SelectProps) => {
  const { track, handleChangeInput } = useVacation();
  return (
    <select
      defaultValue={track}
      onChange={handleChangeInput}
      className="text-black text-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      name={htmlFor}
      id={htmlFor}
      {...rest}
    >
      {TRACKS.map((track) => (
        <option key={track.id} id={track.value}>
          {track.value}
        </option>
      ))}
    </select>
  );
};

const CustomSelect = withLabelSelect(withErrorMessageSelect(Select));

export default CustomSelect;
