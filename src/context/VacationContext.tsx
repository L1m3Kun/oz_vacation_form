import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import localStorageUtils from "../util/localStorageUtils";
import LOCALSTORAGE_KEY from "../util/localStorageKey";

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
    | "초격차 웹 개발 캠프(프론트엔드)"
    | "초격차 웹 개발 캠프(백엔드)"
    | "관리형 웹 풀스택 부트캠프"
    | "CEO 개발부트캠프"
    | "디자인 부트캠프";
  signUrl: string;
  handleChangeInput: <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => void;
  handleSignUrl: (newSign: string) => void;
}

const INITIAL_VACATION: Omit<
  InputValueType,
  "handleChangeInput" | "signUrl" | "handleSignUrl"
> = {
  name: "",
  birth: new Date(Date.now()),
  flag: "",
  duringFrom: "",
  duringTo: "",
  writedAt: new Date(Date.now()),
  reason: "개인 사정으로 인한 휴가",
  track: "------ 트랙 선택 ------",
};

const VacationContext = createContext<InputValueType>({
  ...INITIAL_VACATION,
  signUrl: "",
  handleSignUrl: () => {},
  handleChangeInput: () => {},
});

export const VacationProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue] =
    useState<
      Omit<InputValueType, "handleChangeInput" | "signUrl" | "handleSignUrl">
    >(INITIAL_VACATION);
  const [signUrl, setSignUrl] = useState<string>("");

  const handleChangeInput = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => {
    const target = e.target as T;
    console.log(target);
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
      const vacationData = getItemFromLocalStorage<
        Omit<InputValueType, "handleChangeInput" | "handleSignUrl">
      >(LOCALSTORAGE_KEY.vacationData);
      if (vacationData) {
        const { signUrl, ...inputs } = vacationData;
        setValue(inputs);
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
