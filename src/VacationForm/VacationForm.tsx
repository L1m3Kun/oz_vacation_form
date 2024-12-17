import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
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
  signUrl?: string;
  writedAt?: string;
}

const VacationForm = ({
  name = "김오즈",
  birth = "00.00.00",
  track = "초격차 웹 개발 캠프(프론트엔드)",
  flag = "00기",
  during = "0000년 00월 00일 ~ 0000년 00월 00일 (0일간)",
  reason = "개인 사정으로 인한 휴가",
  signUrl = "",
  writedAt = "",
}: VacationFormProps) => {
  const tableValue = [
    { attribute: "성명", value: name },
    { attribute: "생년월일", value: birth },
    { attribute: "훈련과정", value: track },
    { attribute: "기수", value: `${flag} 기` },
    { attribute: "휴가 신청일", value: during },
  ];

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

          <View style={styles.tableRowReason}>
            <Text style={styles.tableAttributeReason}>신청 사유</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>

          <View style={styles.tableDescription}>
            <Text style={styles.submitText}>
              위와 같이 휴가를 신청하오니 승인하여 주시기 바랍니다.
            </Text>
            <Text style={styles.submitDate}>{writedAt}</Text>
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

export default VacationForm;
