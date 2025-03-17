const dateFormatting = (dateString?: Date | string) => {
  if (dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  } else {
    return "";
  }
};

export default dateFormatting;
