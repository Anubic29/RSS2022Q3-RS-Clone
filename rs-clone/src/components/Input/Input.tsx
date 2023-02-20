import React from 'react';

import styles from './Input.module.scss';

interface InputProps {
  id: string;
  type: string;
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  validationMessage?: string;
}

function Input(props: InputProps) {
  const {
    className,
    id,
    type = 'text',
    name,
    onChange,
    value,
    required,
    placeholder,
    isValid = true,
    validationMessage
  } = props;

  const classNames = className ? `${styles.Input} ${className}` : styles.Input;

  return (
    <>
      <input
        className={isValid ? classNames : `${classNames} ${styles.InputInvalid}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
      {!isValid && <p className={styles.ValidationMessage}>{validationMessage}</p>}
    </>
  );
}

export default Input;
