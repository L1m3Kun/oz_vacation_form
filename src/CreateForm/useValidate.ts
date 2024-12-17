import { useState } from "react";
import { useVacation } from "../context/VacationContext";

const useValidate = () => {
  const { handleChangeInput, handleSignUrl, ...value } = useVacation();
  const [isValidate, setIsValidate] = useState(false);

  const validating = () => {
    const duringFrom = new Date(value.duringFrom);
    const duringTo = new Date(value.duringTo);

    if (
      Object.entries(value)
        .filter(([k, _]) => k !== "reason")
        .every(([_, v]) => v) &&
      duringFrom.getTime() <= duringTo.getTime()
    ) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };

  return { isValidate, validating };
};

export default useValidate;
