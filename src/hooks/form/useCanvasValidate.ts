export const useCanvasValidate = () => {
  const canvasValidate = (currentCanvas?: HTMLCanvasElement) => {
    if (!currentCanvas)
      return [false, "휴가신청서에 작성할 서명을 입력해주세요."];
    const isCanvasEmpty = (
      currentCanvas.getContext("2d") as CanvasRenderingContext2D
    )
      .getImageData(0, 0, currentCanvas.width, currentCanvas.height)
      .data.some((channel) => channel !== 0);

    if (!isCanvasEmpty) {
      return [false, "휴가신청서에 작성할 서명을 입력해주세요."];
    }
    return [isCanvasEmpty, ""];
  };

  return {
    canvasValidate,
  };
};
