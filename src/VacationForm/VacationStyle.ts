import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "SpoqaHanSans",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
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
    fontFamily: "SpoqaHanSans",
    fontSize: "11pt",
    textAlign: "left",
    marginLeft: "2.54cm",
    marginTop: "2.54cm",
  },
  title: {
    fontFamily: "SpoqaHanSans",
    display: "flex",
    justifyContent: "center",
    marginTop: "22pt",
    marginBottom: "40pt",
    fontWeight: "extrabold",
  },
  titleContent: {
    fontSize: "20pt",
    letterSpacing: "0.2cm",
  },
  table: {
    fontFamily: "SpoqaHanSans",
    fontSize: "13pt",
    fontWeight: "bold",
    display: "flex",

    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: "12vw",
    marginRight: "12vw",
    marginBottom: "12vw",
    marginTop: 0,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableAttribute: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    alignContent: "center",
  },
  tableCell: {
    flex: 3, // 각 셀이 동일한 크기를 가지도록 설정
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
  },
  tableHeader: {
    backgroundColor: "#eaeaea",
    fontWeight: "bold",
  },
  tableDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    minHeight: "11.615cm",
    minWidth: "3.545cm",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },

  reason: {
    flex: 3,
    minHeight: "3.096cm",
    display: "flex",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
});
