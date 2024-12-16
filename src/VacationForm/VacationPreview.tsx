import { PDFViewer } from "@react-pdf/renderer";
import { useVacation } from "../context/VacationContext";
import { styles } from "./VacationStyle";
import VacationForm from "./VacationForm";
import getDateDiff from "../util/getDateDiff";
import changeTwoDay from "../util/chageTwoDay";

const VacationPreview = () => {
  const {
    name,
    birth: birthDay,
    flag,
    reason,
    track,
    duringFrom,
    duringTo,
    signUrl,
  } = useVacation();
  const df = new Date(duringFrom);
  const dt = new Date(duringTo);
  const bd = new Date(birthDay);
  const during = `${df.getFullYear()}.${changeTwoDay(
    df.getMonth() + 1
  )}.${changeTwoDay(df.getDate())} ~ ${dt.getFullYear()}.${changeTwoDay(
    dt.getMonth() + 1
  )}.${changeTwoDay(dt.getDate())}(${getDateDiff({
    duringFrom: df,
    duringTo: dt,
  })}일)`;
  const birth = `${bd.getFullYear() % 100}.${changeTwoDay(
    bd.getMonth() + 1
  )}.${changeTwoDay(bd.getDate())}`;
  const value = { name, birth, track, flag, during, reason, signUrl };
  console.log(value);
  return (
    <PDFViewer style={styles.previewContainer}>
      <VacationForm {...value} />
    </PDFViewer>
  );
};

export default VacationPreview;
