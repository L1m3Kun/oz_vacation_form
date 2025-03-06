import { lazy, Suspense, useRef, useState } from "react";

import localStorageUtils from "../../util/localStorageUtils";
import LOCALSTORAGE_KEY from "../../util/localStorageKey";

import Landing from "./Landing";
import FormUser from "./Form.User";
import FormVacation from "./Form.Vacation";
import FormSign from "./Form.Sign";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useVacation } from "../../context/VacationContext";
import useValidate from "./useValidate";
import { SignatureCanvasProps } from "../Canvas/SignatureCanvas";
import { useModal } from "../../context/ModalContext";
import CustomButton from "../../common/CustomButton";

const VacationPreview = lazy(() => import("../VacationForm/VacationPreview"));

interface CurrentPageProps extends SignatureCanvasProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleCreateVactionForm: () => void;
  userValid: boolean;
  vacationValid: boolean;
}

const CurrentPage = ({
  currentPage,
  setCurrentPage,
  reff,
  userValid,
  vacationValid,
  handleCreateVactionForm,
}: CurrentPageProps) => {
  const handlePrevAction = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };
  const handleNextAction = () => {
    setCurrentPage((prev) => (prev + 1 < 5 ? prev + 1 : prev));
  };

  switch (currentPage) {
    case 1:
      return (
        <FormUser
          prevAction={handlePrevAction}
          nextAction={handleNextAction}
          isValid={userValid}
        />
      );
    case 2:
      return (
        <FormVacation
          prevAction={handlePrevAction}
          nextAction={handleNextAction}
          isValid={vacationValid}
        />
      );
    case 3:
      return (
        <FormSign
          reff={reff}
          handleCreateVactionForm={handleCreateVactionForm}
          prevAction={handlePrevAction}
        />
      );
    case 4:
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <VacationPreview />
          <CustomButton
            mode="custom"
            className="absolute bottom-4 left-4  bg-dark p-3 rounded-md shadow-md outline-white outline-1 outline hover:bg-amber-600"
            onClick={handlePrevAction}
          >
            뒤로가기
          </CustomButton>
        </Suspense>
      );

    default:
      return <Landing handleStart={() => setCurrentPage(1)} />;
  }
};

const CreatingFormController = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { handleSignUrl, ...value } = useVacation();
  const { setItemToLocalStorage, removeFromLocalStorage } = localStorageUtils();
  const { isCanvasValid, isValid } = useValidate({ canvasRef });
  const { openModal, closeModal } = useModal();
  const createVacationForm = () => {
    const canvasCurrent = canvasRef.current;

    if (canvasCurrent) {
      if (isCanvasValid(canvasCurrent)) {
        const url = canvasCurrent.toDataURL();
        const { birth, duringFrom, duringTo, flag, name, track } = value;
        const localSavedValue = {
          track,
          birth,
          duringFrom,
          duringTo,
          flag,
          name,
        };
        handleSignUrl(url);
        removeFromLocalStorage(LOCALSTORAGE_KEY.vacationData);
        setItemToLocalStorage(LOCALSTORAGE_KEY.vacationData, {
          ...localSavedValue,
          signUrl: url,
        });
        setCurrentPage((prev) => (prev + 1 > 4 ? prev : prev + 1));
      } else {
        openModal({
          modalKey: "alertCanvas",
          type: "alert",
          title: "오류",
          content: "휴가 신청을 위해 서명을 해주세요.",
          onConfirm: () => closeModal("alertCanvas"),
        });
      }
    } else {
      console.error("canvasCurrent 없음");
    }
  };

  return (
    <main className="relative">
      <CurrentPage
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        reff={canvasRef}
        handleCreateVactionForm={createVacationForm}
        userValid={isValid.userValid}
        vacationValid={isValid.vacationValid}
      />
    </main>
  );
};

export default CreatingFormController;
