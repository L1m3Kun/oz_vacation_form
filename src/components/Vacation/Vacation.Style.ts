import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "pretendard",
  src: "/fonts/Pretendard-Regular.ttf",
});

export const styles = StyleSheet.create({
  previewContainer: {
    width: "100vw",
    height: "100vh",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "pretendard",
    fontSize: "11pt",
    textAlign: "left",
    marginLeft: "2.54cm",
  },
  title: {
    fontFamily: "pretendard",
    display: "flex",
    justifyContent: "center",
    marginTop: "11pt",
    marginBottom: "22pt",
    fontWeight: "extrabold",
  },
  titleContent: {
    fontFamily: "pretendard",
    fontSize: "20pt",
    letterSpacing: "0.3cm",
    fontWeight: "extrabold",
  },
  table: {
    fontFamily: "pretendard",
    fontSize: "12pt",
    fontWeight: "demibold",
    display: "flex",

    flexDirection: "column",
    borderWidth: 1.5,
    borderColor: "#000",
    marginLeft: "2.54cm",
    marginRight: "2.54cm",
    marginTop: 0,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    height: 30,
  },

  tableAttribute: {
    flex: 1,
    borderBottom: 1.5,
    textAlign: "center",
    borderColor: "#000",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 3, // 각 셀이 동일한 크기를 가지도록 설정
    borderBottom: 1.5,
    borderLeft: 1.5,
    borderColor: "#000",
    padding: "7 0",
  },
  tableHeader: {
    backgroundColor: "#eaeaea",
    fontWeight: "bold",
  },
  tableRowReason: {
    display: "flex",
    flexDirection: "row",
    height: 80,
  },
  tableAttributeReason: {
    flex: 1,
    borderRight: 1.5,
    borderBottom: 1.5,
    textAlign: "center",
    borderColor: "#000",
    paddingVertical: 30,
  },
  reason: {
    flex: 3,
    borderBottom: 1.5,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  tableDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    gap: 80,
    paddingTop: 80,
    paddingBottom: 0,
  },

  submitText: {
    display: "flex",
    textAlign: "center",
    minHeight: "3.096cm",
    alignItems: "center",
  },
  submitDate: {
    display: "flex",
    textAlign: "center",
  },
  submitName: {
    display: "flex",
    textAlign: "right",
    alignSelf: "flex-end",
    gap: "2cm",
  },
  submitSignName: {
    position: "relative",
    paddingVertical: 14,
    letterSpacing: 3,
    marginRight: 20,
  },
  submitSign: {
    letterSpacing: 4,
  },
  sign: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 0,
    right: 0,
  },
});
