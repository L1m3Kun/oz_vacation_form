import { InputValueType } from "../context/VacationContext";

export const useTranslateText = () => {
  const translateTrack = (track: InputValueType["track"]) => {
    switch (track) {
      case "초격차 캠프 프론트엔드 코스":
        return track;
      case "초격차 캠프 백엔드 코스":
        return track;
      case "1인 창업가 개발부트캠프":
        return "IT스타트업 실무형 풀스택 웹 개발 부트캠프 (React + Node.js)";
      default:
        return track;
    }
  };

  const translateFlag = (
    track: InputValueType["track"],
    flag: InputValueType["flag"]
  ) => {
    if (track === "초격차 캠프 프론트엔드 코스" && Number(flag) >= 9) {
      return (Number(flag) + 1).toString();
    }
    if (track === "1인 창업가 개발부트캠프") {
      return (Number(flag) + 1).toString();
    }
    return flag;
  };
  return { translateFlag, translateTrack };
};
