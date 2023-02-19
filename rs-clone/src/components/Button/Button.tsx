import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { children, className } = props;
  const classNames = className ? `${styles.Button} ${className}` : styles.Button;

  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}

export default Button;
