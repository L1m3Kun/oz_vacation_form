import { useRef } from "react";
// import { useNavigate } from "react-router-dom";

// import { useVacation } from "../../context/VacationContext";
// import useValidate from "./useValidate";

// import localStorageUtils from "../../util/localStorageUtils";
// import LOCALSTORAGE_KEY from "../../util/localStorageKey";

import Landing from "./Landing";
import FormUser from "./Form.User";
import FormVacation from "./Form.Vacation";
import FormSign from "./Form.Sign";

const CreatingForm = () => {
  // const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const { handleChangeInput, handleSignUrl } = useVacation();
  // const { setItemToLocalStorage, removeFromLocalStorage } = localStorageUtils();
  // const { isCanvasBlank } = useValidate();

  // const createVacationForm = () => {
  //   const canvasCurrent = canvasRef.current;
  //   if (canvasCurrent) {
  //     if (isCanvasBlank(canvasCurrent)) {
  //       const url = canvasCurrent.toDataURL();
  //       const { birth, duringFrom, duringTo, flag, name, track } = value;
  //       const localSavedValue = {
  //         track,
  //         birth,
  //         duringFrom,
  //         duringTo,
  //         flag,
  //         name,
  //       };
  //       handleSignUrl(url);
  //       removeFromLocalStorage(LOCALSTORAGE_KEY.vacationData);
  //       setItemToLocalStorage(LOCALSTORAGE_KEY.vacationData, {
  //         ...localSavedValue,
  //         signUrl: url,
  //       });
  //       navigate("/preview");
  //     } else {
  //       alert("서명이 비어있습니다.");
  //     }
  //   } else {
  //     console.error("canvasCurrent 없음");
  //   }
  // };

  return (
    <main className="">
      <Landing />
      <FormUser />
      <FormVacation />
      <FormSign reff={canvasRef} />
    </main>
  );
};

export default CreatingForm;
