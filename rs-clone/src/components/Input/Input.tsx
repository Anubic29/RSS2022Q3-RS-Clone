import React from 'react';

import styles from './Input.module.scss';

interface InputProps {
  id: string;
  type: 'text';
  className?: string;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function Input(props: InputProps) {
  const { className } = props;
  const classNames = className ? `${styles.Input} ${className}` : styles.Input;

  return <input {...props} className={classNames} />;
}

export default Input;
