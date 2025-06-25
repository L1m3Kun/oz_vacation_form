import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOCALSTORAGE_KEY, localStorageUtils } from "../utils";

export interface InputValueType {
  name: string;
  birth: Date | string;
  flag: string;
  duringFrom: Date | string;
  duringTo: Date | string;
  reason: string;
  writedAt: Date | string;
  track:
    | "------ 트랙 선택 ------"
    | "초격차 캠프 프론트엔드 코스"
    | "초격차 캠프 백엔드 코스"
    | "1인 창업가 개발부트캠프";
  signUrl: string;
  handleChangeInput: <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => void;
  handleSignUrl: (newSign: string) => void;
}

type INITIAL_VACATION_TYPE = Omit<
  InputValueType,
  "handleChangeInput" | "signUrl" | "handleSignUrl"
>;

const INITIAL_VACATION: INITIAL_VACATION_TYPE = {
  track: "------ 트랙 선택 ------",
  name: "",
  birth: new Date(Date.now()).toString(),
  flag: "",
  duringFrom: "",
  duringTo: "",
  reason: "개인 사정으로 인한 휴가",
  writedAt: new Date(Date.now()).toString(),
};

const VacationContext = createContext<InputValueType>({
  ...INITIAL_VACATION,
  signUrl: "",
  handleSignUrl: () => {},
  handleChangeInput: () => {},
});

export const VacationProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<INITIAL_VACATION_TYPE>(INITIAL_VACATION);
  const [signUrl, setSignUrl] = useState<string>("");

  const handleChangeInput = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => {
    const target = e.target as T;
    if (target.id in value) {
      setValue((prev) => ({ ...prev, [target.id]: target.value }));
    }
  };
  const handleSignUrl = (newSignUrl: string) => {
    setSignUrl(newSignUrl);
  };

  useEffect(() => {
    const getLocalStorage = () => {
      const { getItemFromLocalStorage } = localStorageUtils();
      const vacationData = getItemFromLocalStorage<INITIAL_VACATION_TYPE>(
        LOCALSTORAGE_KEY.vacationData
      );
      if (vacationData) {
        const { ...inputs } = vacationData;
        setValue((prev) => ({ ...prev, ...inputs, writedAt: inputs.writedAt }));
      }
    };
    getLocalStorage();
  }, []);

  return (
    <VacationContext.Provider
      value={{ ...value, signUrl: signUrl, handleChangeInput, handleSignUrl }}
    >
      {children}
    </VacationContext.Provider>
  );
};

export const useVacation = () => {
  const vacation = useContext(VacationContext);
  if (!vacation) {
    new Error("context 에러 vacation이 선언되지 않음");
  }
  return vacation;
};
