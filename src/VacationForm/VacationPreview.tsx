import { PDFViewer } from "@react-pdf/renderer";
import { styles } from "./VacationStyle";
import VacationForm from "./VacationForm";

const VacationPreview = () => {
  return (
    <PDFViewer style={styles.previewContainer}>
      <VacationForm />
    </PDFViewer>
  );
};

export default VacationPreview;
