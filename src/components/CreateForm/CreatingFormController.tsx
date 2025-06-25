import { lazy, Suspense, useRef, useState } from "react";

import Landing from "./Landing";
import FormUser from "./Form.User";
import FormVacation from "./Form.Vacation";
import FormSign from "./Form.Sign";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useVacation } from "../../context/VacationContext";
import useValidate, {
  UserValidations,
  VacationValidations,
} from "./useValidate";
import { SignatureCanvasProps } from "../Canvas/SignatureCanvas";
import { useModal } from "../../context/ModalContext";
import { LOCALSTORAGE_KEY, localStorageUtils } from "../../utils";
import { CustomButton } from "../../common";

const VacationPreview = lazy(() => import("../Vacation/Vacation.Preview"));

interface CurrentPageProps extends SignatureCanvasProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleCreateVactionForm: () => void;
  userValid: UserValidations;
  vacationValid: VacationValidations;
}

const CurrentPage = ({
  currentPage,
  setCurrentPage,
  reff,
  userValid,
  vacationValid,
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
        <FormUser
          prevAction={handlePrevAction}
          nextAction={handleNextAction}
          isValid={Object.values(userValid).every((e) => e)}
        />
      );
    case 2:
      return (
        <FormVacation
          prevAction={handlePrevAction}
          nextAction={handleNextAction}
          isValid={Object.values(vacationValid).every((e) => e)}
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
              href={
                ["1인 창업가 개발부트캠프"].includes(track)
                  ? "https://ml2391tcuid.typeform.com/to/dfuDtbtN"
                  : "https://ml2391tcuid.typeform.com/to/JTIdKwSG"
              }
            >
              제출하기
            </CustomButton>
          </div>
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
  const { canvasValidate, userValid, vacationValid } = useValidate();
  const { openModal, closeModal } = useModal();

  const createVacationForm = () => {
    const canvasCurrent = canvasRef.current;

    if (canvasCurrent) {
      if (canvasValidate(canvasCurrent)) {
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
        userValid={userValid}
        vacationValid={vacationValid}
      />
    </main>
  );
};

export default CreatingFormController;
