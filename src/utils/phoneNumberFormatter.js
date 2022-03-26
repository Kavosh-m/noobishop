export const formatter = (number) => {
  // +989112566137
  return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(
    6,
    9
  )} ${number.slice(9)}`;
};
