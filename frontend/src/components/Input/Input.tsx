import React, { CSSProperties, useMemo } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  id?: string;
  type?: string;
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  autoFocus?: boolean;
}

function Input(props: InputProps) {
  const { className, errorMessage, type = 'text', ...rest } = props;

  const inputClassName = useMemo(() => {
    let str = styles['input'];
    if (className) str += ` ${className}`;
    if (errorMessage) str += ` ${styles['invalid']}`;
    return str;
  }, [className, errorMessage]);

  return (
    <div className={styles['input-block']}>
      <input className={inputClassName} type={type} {...rest} />
      {errorMessage && <p className={styles['message']}>{errorMessage}</p>}
    </div>
  );
}

export default Input;
