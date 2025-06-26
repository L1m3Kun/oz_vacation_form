import { RefObject } from "react";
import { useDraw, useResize } from "../../hooks";

export interface SignatureCanvasProps {
  reff: RefObject<HTMLCanvasElement>;
}

const SignatureCanvas = ({ reff }: SignatureCanvasProps) => {
  const { canvasRef, clearCanvas, draw, startDrawing, stopDrawing } = useDraw({
    canvasRef: reff,
  });
  const { windowWidthSize } = useResize();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto gap-4 pb-10 touch-none">
      <button
        type="button"
        onClick={clearCanvas}
        className="flex justify-center align-middle  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        서명 다시하기 🔄
      </button>
      <canvas
        className="border-solid w-64 sm:w-[26rem] h-72 border cursor-crosshair bg-sign-img bg-cover bg-center bg-no-repeat"
        ref={canvasRef}
        width={windowWidthSize}
        height={288}
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchEnd={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchCancel={stopDrawing}
      ></canvas>
    </div>
  );
};

export default SignatureCanvas;
