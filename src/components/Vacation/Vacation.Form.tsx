import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./Vacation.Style";
import { InputValueType } from "../../context/VacationContext";

interface VacationFormProp
  extends Omit<
    InputValueType,
    "duringTo" | "duringFrom" | "handleChangeInput" | "handleSignUrl" | "track"
  > {
  during?: string;
  track?: string;
  downloadName?: string;
}

export const VacationForm = ({
  name = "김오즈",
  birth = "00.00.00",
  track = "초격차 캠프 프론트엔드 코스",
  flag = "00기",
  during = "0000년 00월 00일 ~ 0000년 00월 00일 (0일간)",
  reason = "개인 사정으로 인한 휴가",
  signUrl = "",
  writedAt = "",
  downloadName = "",
}: VacationFormProp) => {
  const tableValue = [
    { attribute: "성명", value: name },
    { attribute: "생년월일", value: birth.toString() },
    { attribute: "훈련과정", value: track },
    { attribute: "차수", value: `${flag} 차수` },
    { attribute: "휴가 신청일", value: during },
  ];

  return (
    <Document style={styles.previewContainer} title={downloadName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>■ 넥스트러너스 - 휴가신청서</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleContent}>휴가신청서</Text>
        </View>

        <View style={styles.table}>
          {tableValue?.map(({ attribute, value }) => (
            <View key={attribute} style={styles.tableRow}>
              <Text style={styles.tableAttribute}>{attribute}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}

          <View style={styles.tableRowReason}>
            <Text style={styles.tableAttributeReason}>신청 사유</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>

          <View style={styles.tableDescription}>
            <Text style={styles.submitText}>
              위와 같이 휴가를 신청하오니 승인하여 주시기 바랍니다.
            </Text>
            <Text style={styles.submitDate}>{writedAt.toString()}</Text>
            <View style={styles.submitName}>
              <Text style={styles.submitSignName}>신청자: {name} (인)</Text>

              <Image src={signUrl} style={styles.sign}></Image>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
