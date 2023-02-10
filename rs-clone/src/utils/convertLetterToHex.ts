export const convertLetterToHex = (letter: string, maxLength: number, padStr: string) => {
  let charCode = letter.charCodeAt(0);
  if (charCode >= 78) charCode -= 50;
  else charCode += 50;
  return `${charCode.toString(16)}`.substring(0, maxLength - 1).padEnd(maxLength, padStr);
};
