import LogoImage from "../../assets/images/오즈_라이트.png";
import CustomButton from "../../common/CustomButton";

interface LandingProps {
  handleStart: () => void;
}

const Landing = ({ handleStart }: LandingProps) => {
  return (
    <div className="h-screen  flex flex-col justify-center items-center">
      <h1 className="p-5 flex flex-col justify-center gap-6 text-center items-center font-extrabold text-3xl">
        <img
          src={LogoImage}
          alt="로고"
          height={21}
          width={155}
          className="block"
        />
        <p className="">휴가 신청서 제작 폼</p>
      </h1>
      <CustomButton mode="default" onClick={handleStart}>
        시작하기
      </CustomButton>
    </div>
  );
};

export default Landing;
