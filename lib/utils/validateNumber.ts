export const validateNumber = (value: string) => {
  return RegExp(/^[0-9]*\.?[0-9]*$/).test(value);
};
