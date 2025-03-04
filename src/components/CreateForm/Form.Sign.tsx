import Description from "../../common/Description";
import Title from "../../common/Title";
import SignatureCanvas, {
  SignatureCanvasProps,
} from "../Canvas/SignatureCanvas";
import CreateButton from "./CreateButton";

const FormSign = ({ reff }: SignatureCanvasProps) => {
  return (
    <section className="h-screen w-full max-w-sm mx-auto flex flex-col justify-center items-center gap-2">
      <Title>휴가 확인 서명</Title>
      <Description>휴가 신청서를 작성하기 위한 서명을 해주세요.</Description>
      <SignatureCanvas reff={reff} />
      <CreateButton />
    </section>
  );
};

export default FormSign;
