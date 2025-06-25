export const calculateMinBirth = () => {
  const today = Date.now();
  const minDate = new Date(today - 473400622019);
  const minBirth = {
    year: minDate.getFullYear().toString(),
    month: minDate.getMonth().toString(),
    day: minDate.getDate().toString(),
  };
  const minBirthText = `${minDate.getFullYear()}-${minDate.getMonth()}-${minDate.getDate()}`;
  return { minBirthText, minBirth };
};
