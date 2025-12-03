import { memo } from "react";
import { CustomButton } from "./CustomButton";

export interface PageButtonsProps {
  mode: "prevOnly" | "nextOnly" | "both";
  prevAction?: () => void;
  nextAction?: () => void;
}

export const PageButtons = memo<PageButtonsProps>(
  ({ mode, prevAction, nextAction }) => {
    switch (mode) {
      case "prevOnly":
        return (
          <div className="flex items-center justify-center gap-4">
            <CustomButton mode="outline" onClick={prevAction}>
              이전
            </CustomButton>
          </div>
        );
      case "nextOnly":
        return (
          <div className="flex items-center justify-center gap-4">
            <CustomButton mode="default" onClick={nextAction}>
              다음
            </CustomButton>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center gap-4">
            <CustomButton mode="outline" onClick={prevAction}>
              이전
            </CustomButton>
            <CustomButton mode="default" onClick={nextAction}>
              다음
            </CustomButton>
          </div>
        );
    }
  }
);
