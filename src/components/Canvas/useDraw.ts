import React, { RefObject, useState } from "react";
import { useVacation } from "../../context/VacationContext";

interface DrawParams {
  canvasRef: RefObject<HTMLCanvasElement>;
}

const useDraw = ({ canvasRef }: DrawParams) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { handleSignUrl } = useVacation();
  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 시작점 설정
    const rect = canvas.getBoundingClientRect();
    let offsetX, offsetY;
    if ("touches" in event) {
      [offsetX, offsetY] = [
        event.touches[0].clientX - rect.left,
        event.touches[0].clientY - rect.top,
      ];
    } else {
      [offsetX, offsetY] = [
        event.clientX - rect.left,
        event.clientY - rect.top,
      ];
    }

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let offsetX, offsetY;
    if ("touches" in event) {
      [offsetX, offsetY] = [
        event.touches[0].clientX - rect.left,
        event.touches[0].clientY - rect.top,
      ];
    } else {
      [offsetX, offsetY] = [
        event.clientX - rect.left,
        event.clientY - rect.top,
      ];
    }
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleSignUrl("");
  };

  return { canvasRef, startDrawing, draw, stopDrawing, clearCanvas };
};

export default useDraw;
