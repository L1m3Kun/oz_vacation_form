import LogoImage from "../assets/images/오즈_라이트.png";
import { CustomButton } from "../components/_common";
import { Information } from "../components/Landing";

// import GithubIcon from "../assets/icons/ic_github.svg";

interface LandingProps {
  handleStart: () => void;
}

const Landing = ({ handleStart }: LandingProps) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="flex flex-col justify-center gap-6 text-center items-center font-extrabold text-3xl">
        <img
          src={LogoImage}
          alt="로고"
          height={21}
          width={155}
          className="block"
        />
        <p className="">휴가 신청서 제작 폼</p>
      </h1>
      <Information className="mt-8" />
      <div className="flex items-center justify-between gap-3 my-5">
        {/* <CustomButton
          mode="link"
          href="https://github.com/L1m3Kun/oz_vacation_form"
          className=" w-8 h-8"
        >
          <img
            src={GithubIcon}
            alt="Github 바로가기"
            width={40}
            height={40}
            className="object-center w-full h-full bg-white rounded-full"
          />
        </CustomButton> */}
        <CustomButton
          href="https://github.com/L1m3Kun/oz_vacation_form/issues/2"
          mode="link"
          className="text-lg text-gray-400"
        >
          💬 여러분의 의견을 들려주세요.
        </CustomButton>
      </div>
      <CustomButton mode="default" onClick={handleStart}>
        시작하기
      </CustomButton>
    </div>
  );
};

export default Landing;
