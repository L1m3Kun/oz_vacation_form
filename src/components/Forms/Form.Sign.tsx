import { Description, PageButtons, PageButtonsProps, Title } from "../_common";
import SignatureCanvas, {
  SignatureCanvasProps,
} from "../Canvas/SignatureCanvas";
import CreateButton from "../Controllers/CreateButton";

interface FormSignProps
  extends SignatureCanvasProps,
    Pick<PageButtonsProps, "prevAction"> {
  handleCreateVactionForm: () => void;
}

export const FormSign = ({
  reff,
  handleCreateVactionForm,
  prevAction,
}: FormSignProps) => {
  return (
    <section className="h-screen w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-2 px-2">
      <Title>휴가 확인 서명</Title>
      <Description>휴가 신청서를 작성하기 위한 서명을 해주세요.</Description>
      <SignatureCanvas reff={reff} />
      <div className="flex items-center justify-center gap-4">
        <PageButtons mode="prevOnly" prevAction={prevAction} />
        <CreateButton onClick={handleCreateVactionForm} />
      </div>
    </section>
  );
};
