import React from 'react';
import {
  MdErrorOutline as ErrorIcon,
  MdWarningAmber as WarningIcon,
  MdInfoOutline as InfoIcon,
  MdCheckCircleOutline as SuccessIcon
} from 'react-icons/md';

import styles from './Alert.module.scss';

interface AlertProps {
  type: 'Warning' | 'Success' | 'Error' | 'Info';
  message: string;
  className?: string;
  children?: React.ReactNode;
}

const ICONS_MAP = {
  Warning: <WarningIcon className={[styles.Icon, styles.IconWarning].join(' ')} />,
  Error: <ErrorIcon className={[styles.Icon, styles.IconError].join(' ')} />,
  Success: <SuccessIcon className={[styles.Icon, styles.IconSuccess].join(' ')} />,
  Info: <InfoIcon className={[styles.Icon, styles.IconInfo].join(' ')} />
};

function Alert(props: AlertProps) {
  const { type, message, children, className } = props;

  return (
    <div className={[styles.Alert, styles[`Alert${type}`], className].join(' ')}>
      <div className={styles.RowTop}>
        {ICONS_MAP[type]}
        <p className={styles.Message}>{message}</p>
      </div>
      {children && <div className={styles.RowBottom}>{children}</div>}
    </div>
  );
}

export default Alert;
