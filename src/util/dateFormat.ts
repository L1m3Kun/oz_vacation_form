const dateFormatting = (dateString?: Date | string) => {
  console.log(dateString);
  if (dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  } else {
    return "";
  }
};

export default dateFormatting;
