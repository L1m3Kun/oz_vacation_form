import { PDFViewer } from "@react-pdf/renderer";

import { useVacation } from "../../context/VacationContext";
import getDateDiff from "../../util/getDateDiff";
import changeTwoDay from "../../util/chageTwoDay";

import { styles } from "./VacationStyle";
import VacationForm from "./VacationForm";
import useIsMobile from "../../common/useIsMobile";
import VacationMobile from "./Vacation.Mobile";

const now = new Date();
const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
const koreaTimeDiff = 32400000;

const VacationPreview = () => {
  const isMobile = useIsMobile();
  const {
    name,
    birth: birthDay,
    flag,
    reason,
    track,
    duringFrom,
    duringTo,
    signUrl,
    writedAt: strWritedAt,
  } = useVacation();
  const df = new Date(duringFrom ?? "");
  const dt = new Date(duringTo ?? "");
  const bd = new Date(birthDay ?? "");
  const wa = new Date(strWritedAt ?? utc + koreaTimeDiff);

  const during = `${df.getFullYear()}.${changeTwoDay(
    df.getMonth() + 1
  )}.${changeTwoDay(df.getDate())} ~ ${dt.getFullYear()}.${changeTwoDay(
    dt.getMonth() + 1
  )}.${changeTwoDay(dt.getDate())}(${Math.floor(
    getDateDiff({
      duringFrom: df,
      duringTo: dt,
    })
  )}일)`;
  const birth = `${changeTwoDay(bd.getFullYear() % 100)}.${changeTwoDay(
    bd.getMonth() + 1
  )}.${changeTwoDay(bd.getDate())}`;
  const writedAt = `${wa.getFullYear()}년   ${
    wa.getMonth() + 1
  }월   ${wa.getDate()}일`;

  const value = {
    name,
    birth,
    track,
    flag,
    during,
    reason,
    signUrl,
    writedAt,
  };

  return (
    <>
      {isMobile ? (
        <VacationMobile documentS={<VacationForm {...value} />} />
      ) : (
        <PDFViewer style={styles.previewContainer}>
          <VacationForm {...value} />
        </PDFViewer>
      )}
    </>
  );
};

export default VacationPreview;
