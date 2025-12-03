import { useRef, useState } from "react";

import Landing from "./Landing";

import { useVacation } from "../context/VacationContext";

import { SignatureCanvasProps } from "../components/Canvas/SignatureCanvas";
import { useModal } from "../context/ModalContext";
import { LOCALSTORAGE_KEY, localStorageUtils } from "../utils";
import { VacationPDFPreview } from "../components/Vacation";
import { SUBMIT_LINKS } from "../assets/configs/submitLinks";
import { FormUser } from "../components/Forms/Form.User";
import { FormVacation } from "../components/Forms/Form.Vacation";
import { FormSign } from "../components/Forms/Form.Sign";
import { useCanvasValidate } from "../hooks/form/useCanvasValidate";

interface CurrentPageProps extends SignatureCanvasProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleCreateVactionForm: () => void;
}

const CurrentPage = ({
  currentPage,
  setCurrentPage,
  reff,
  handleCreateVactionForm,
}: CurrentPageProps) => {
  const { track } = useVacation();
  const handlePrevAction = () => {
    setCurrentPage((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };
  const handleNextAction = () => {
    setCurrentPage((prev) => (prev + 1 < 5 ? prev + 1 : prev));
  };
  switch (currentPage) {
    case 1:
      return (
        <FormUser prevAction={handlePrevAction} nextAction={handleNextAction} />
      );
    case 2:
      return (
        <FormVacation
          prevAction={handlePrevAction}
          nextAction={handleNextAction}
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
        <VacationPDFPreview
          handlePrevAction={handlePrevAction}
          href={SUBMIT_LINKS[track]}
        />
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
  const { canvasValidate } = useCanvasValidate();
  const { openModal, closeModal } = useModal();

  const createVacationForm = () => {
    const canvasCurrent = canvasRef.current;

    if (canvasCurrent) {
      const [isValid, errorText] = canvasValidate(canvasCurrent);
      if (isValid) {
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
          content: errorText,
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
      />
    </main>
  );
};

export default CreatingFormController;
