import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
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
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
  handleChangeInput: <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => void;
}

const INITIAL_VACATION: Omit<
  InputValueType,
  "handleChangeInput" | "canvasRef"
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
  canvasRef: null,
  handleChangeInput: () => {},
});

export const VacationProvider = ({ children }: PropsWithChildren) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value, setValue] =
    useState<Omit<InputValueType, "handleChangeInput" | "canvasRef">>(
      INITIAL_VACATION
    );

  const handleChangeInput = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => {
    const target = e.target as T;
    if (target.id in value) {
      setValue((prev) => ({ ...prev, [target.id]: target.value }));
      console.log(target.id, target.value);
    }
  };
  return (
    <VacationContext.Provider
      value={{ ...value, canvasRef, handleChangeInput }}
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
