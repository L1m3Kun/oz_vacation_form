interface DateDifferentParams {
  duringFrom: Date;
  duringTo: Date;
}
const getDateDiff = ({ duringFrom, duringTo }: DateDifferentParams): number => {
  const diffDate = duringTo.getTime() - duringFrom.getTime();
  return Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1;
};

export default getDateDiff;