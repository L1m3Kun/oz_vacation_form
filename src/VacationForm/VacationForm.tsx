import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./VacationStyle";

interface VacationFormProps {
  name?: string;
  birth?: string;
  track?:
    | "초격차 웹 개발 캠프(프론트엔드)"
    | "초격차 웹 개발 캠프(백엔드)"
    | "관리형 웹 풀스택 부트캠프";
  flag?: string | number;
  during?: string;
  reason?: string;
}

const VacationForm = ({
  name = "",
  birth = "",
  track = "초격차 웹 개발 캠프(프론트엔드)",
  flag = "00기",
  during = "0000년 00월 00일 ~ 0000년 00월 00일 (0일간)",
  reason = "개인 사정으로 인한 휴가",
}: VacationFormProps) => {
  const tableValue = [
    { attribute: "성명", value: name },
    { attribute: "생년월일", value: birth },
    { attribute: "훈련과정", value: track },
    { attribute: "기수", value: flag },
    { attribute: "휴가 신청일", value: during },
  ];

  const date = new Date();

  return (
    <Document style={styles.previewContainer} title={`${name} 휴가 신청서.pdf`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>■ 오즈코딩스쿨 - 휴가신청서</Text>
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

          <View style={styles.tableRow}>
            <Text style={styles.tableAttribute}>신청 사유</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>

          <View style={styles.tableDescription}>
            <Text style={styles.submitText}>
              위와 같이 휴가를 신청하오니 승인하여 주시기 바랍니다.
            </Text>
            <Text
              style={styles.submitDate}
            >{`${date.getFullYear()}년   ${date.getMonth()}월   ${date.getDay()}일`}</Text>
            <View style={styles.submitName}>
              <Text>신청자: {name}</Text>
              <Text>(인)</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default VacationForm;
