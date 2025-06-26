import { InputValueType } from "../../../context";

type SubmitLinkType = Record<InputValueType["track"], string>;
export const SUBMIT_LINKS: SubmitLinkType = {
  "------ 트랙 선택 ------": "",
  "초격차 캠프 프론트엔드 코스":
    process.env.REACT_APP_TEACHING_TEAM_DEFAULT_SUBMIT_LINK ?? "",
  "초격차 캠프 백엔드 코스":
    process.env.REACT_APP_TEACHING_TEAM_DEFAULT_SUBMIT_LINK ?? "",
  "1인 창업가 개발부트캠프":
    process.env.REACT_APP_TEACHING_5TEAM_SUBMIT_LINK ?? "",
};
