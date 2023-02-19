import React from 'react';

interface CheckIsValidInputParams {
  condition: boolean;
  setValidationStateFn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NAME_MIN_LENGTH = 3;
const DESCRIPTION_MIN_LENGTH = 8;
const KEY_LENGTH = 3;

const changeKeyInput = (key: string) =>
  key
    .split('')
    .filter((char) => char !== ' ')
    .map((char) => char.toUpperCase())
    .join('');

const checkIsValidInput = (params: CheckIsValidInputParams) => {
  const { condition, setValidationStateFn } = params;

  if (condition) {
    setValidationStateFn(true);
  } else {
    setValidationStateFn(false);
  }
};

const projectValidationData = {
  NAME_MIN_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  KEY_LENGTH,
  changeKeyInput,
  checkIsValidInput
};

export default projectValidationData;
