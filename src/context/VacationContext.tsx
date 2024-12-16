import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export interface InputValueType {
  name: string;
  birth: Date;
  flag: number;
  duringFrom: Date;
  duringTo: Date;
  reason: string;
  track:
    | "초격차 웹 개발 캠프(프론트엔드)"
    | "초격차 웹 개발 캠프(백엔드)"
    | "관리형 웹 풀스택 부트캠프";
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
  birth: new Date(),
  flag: 0,
  duringFrom: new Date(),
  duringTo: new Date(),
  reason: "개인 사정으로 인한 휴가",
  track: "초격차 웹 개발 캠프(프론트엔드)",
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
    if (target.id in value) {
      setValue((prev) => ({ ...prev, [target.id]: target.value }));
    }
  };
  const handleSignUrl = (newSignUrl: string) => {
    setSignUrl(newSignUrl);
  };
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
