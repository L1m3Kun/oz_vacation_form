import CustomButton from "./CustomButton";

interface PageButtonsProps {
  mode: "prevOnly" | "nextOnly" | "both";
  prevAction?: () => void;
  nextAction?: () => void;
}

const PageButtons = ({ mode, prevAction, nextAction }: PageButtonsProps) => {
  switch (mode) {
    case "prevOnly":
      return (
        <div className="flex items-center gap-4 pt-8">
          <CustomButton mode="outline" onClick={prevAction}>
            이전
          </CustomButton>
        </div>
      );
    case "nextOnly":
      return (
        <div className="flex items-center gap-4 pt-8">
          <CustomButton mode="default" onClick={nextAction}>
            다음
          </CustomButton>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-4 pt-8">
          <CustomButton mode="outline" onClick={prevAction}>
            이전
          </CustomButton>
          <CustomButton mode="default" onClick={nextAction}>
            다음
          </CustomButton>
        </div>
      );
  }
};

export default PageButtons;
