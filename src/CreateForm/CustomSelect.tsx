import { ChangeEvent } from "react";

const TRACKS = [
  {
    id: "FE",
    value: "초격차 웹 개발 캠프(프론트엔드)",
  },
  { id: "BE", value: "초격차 웹 개발 캠프(백엔드)" },
  { id: "FS", value: "관리형 웹 풀스택 부트캠프" },
];

interface CustomSelectProps {
  track:
    | "초격차 웹 개발 캠프(프론트엔드)"
    | "초격차 웹 개발 캠프(백엔드)"
    | "관리형 웹 풀스택 부트캠프";
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = ({ track, onChange }: CustomSelectProps) => {
  return (
    <select
      defaultValue={track}
      onChange={onChange}
      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      name="track"
      id="track"
    >
      {TRACKS.map((track) => (
        <option key={track.id} id={track.value}>
          {track.value}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
