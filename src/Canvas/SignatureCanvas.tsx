import useDraw from "./useDraw";
import { RefObject } from "react";

interface SignatureCanvasProps {
  reff: RefObject<HTMLCanvasElement>;
}

const SignatureCanvas = ({ reff }: SignatureCanvasProps) => {
  const { canvasRef, clearCanvas, draw, startDrawing, stopDrawing } = useDraw({
    canvasRef: reff,
  });
  return (
    <div className="flex justify-center ml-[7.4rem] gap-2">
      <canvas
        className="border-solid border cursor-crosshair bg-sign-img bg-cover"
        ref={canvasRef}
        width={380}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <button
        type="button"
        onClick={clearCanvas}
        className="h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        다시 그리기
      </button>
    </div>
  );
};

export default SignatureCanvas;
