import { lazy, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { CustomButton } from "../../common";
const VacationPreview = lazy(() => import("../Vacation/Vacation.Preview"));

interface VacationPDFPreviewProps {
  handlePrevAction: () => void;
  href: string;
}
export const VacationPDFPreview = ({
  handlePrevAction,
  href,
}: VacationPDFPreviewProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VacationPreview />
      <div>
        <CustomButton
          mode="custom"
          className="absolute bottom-4 left-4  bg-dark p-3 rounded-md shadow-md outline-white outline-1 outline hover:bg-gray-700"
          onClick={handlePrevAction}
        >
          뒤로가기
        </CustomButton>
        <CustomButton
          mode="link"
          className="absolute bottom-4 left-28  bg-purple-600 p-3 rounded-md shadow-md hover:bg-purple-800"
          href={href}
        >
          제출하기
        </CustomButton>
      </div>
    </Suspense>
  );
};

export * from "./Vacation.Form";
export * from "./Vacation.Mobile";
export * from "./Vacation.Preview";
export * from "./Vacation.Style";
