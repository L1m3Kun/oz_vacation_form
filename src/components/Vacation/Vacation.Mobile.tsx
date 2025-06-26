import { usePDF } from "@react-pdf/renderer";

import { useCallback, useEffect } from "react";
import { CustomButton } from "../../common";

interface VacationMobileProps {
  documentS: React.ReactElement;
  downloadName: string;
}

export const VacationMobile = ({
  documentS,
  downloadName,
}: VacationMobileProps) => {
  const [documentInstance] = usePDF({ document: documentS });

  const makeUrlFromPDF = useCallback(() => {
    if (documentInstance.blob) {
      const url = URL.createObjectURL(documentInstance.blob);
      const aTag = document.createElement("a");
      aTag.href = url;
      aTag.target = "_blank";
      aTag.download = downloadName;
      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
      URL.revokeObjectURL(url);
    }
  }, [documentInstance, downloadName]);

  useEffect(() => {
    makeUrlFromPDF();
  }, [makeUrlFromPDF]);

  return (
    <div className="h-screen w-full text-center flex flex-col justify-center items-center gap-8">
      <p className="font-semibold">
        모바일 환경에서는 미리보기가 제공되지 않습니다.
      </p>
      <CustomButton mode="default" onClick={makeUrlFromPDF}>
        다운로드
      </CustomButton>
    </div>
  );
};
