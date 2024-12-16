import useDraw from "./useDraw";
import SignBG from "../assets/images/사인칸.png";

const SignatureCanvas = () => {
  const { canvasRef, clearCanvas, draw, startDrawing, stopDrawing } = useDraw();
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{
          border: "1px solid black",
          cursor: "crosshair",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      >
        <img src={SignBG} alt="사인칸" />
      </canvas>
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default SignatureCanvas;
