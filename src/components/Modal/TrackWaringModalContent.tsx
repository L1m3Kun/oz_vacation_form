const TrackWaringModalContent = () => {
  return (
    <div className="">
      <p className="text-gray-700 text-base leading-relaxed mb-6">
        초격차 프론트엔드 코스의 경우,
        <br />
        <span className="font-semibold">9기 이후 기수부터</span> 차수를 적을 때{" "}
        <span className="font-bold">현재 기수 + 1</span>한 값을 적어주세요.
      </p>

      <div className="bg-lime-200 text-gray-800 rounded-lg p-4 text-left">
        <p className="font-semibold mb-2">예시)</p>
        <ul className="space-y-1 ml-2">
          <li>• 9기 → 10차수</li>
          <li>• 11기 → 12차수</li>
          <li>• 10기 → 11차수</li>
        </ul>
      </div>
    </div>
  );
};

export default TrackWaringModalContent;
