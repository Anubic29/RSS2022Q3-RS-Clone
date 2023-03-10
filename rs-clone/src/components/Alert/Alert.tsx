import React from 'react';
import {
  MdErrorOutline as ErrorIcon,
  MdWarningAmber as WarningIcon,
  MdInfoOutline as InfoIcon,
  MdCheckCircleOutline as SuccessIcon
} from 'react-icons/md';
import { useAlerts } from '../../contexts';
import { MdOutlineClear as RemoveIcon } from 'react-icons/md';

import styles from './Alert.module.scss';

export interface AlertProps {
  id: string;
  type: 'Warning' | 'Success' | 'Error' | 'Info';
  message: string;
  isFinite: boolean;
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
  const { type, message, className, id, children } = props;
  const { removeAlert } = useAlerts();

  const onClickHandler = () => {
    removeAlert(id);
  };

  return (
    <div className={[styles.Alert, styles[`Alert${type}`], className].join(' ')} id={id}>
      <div className={styles.RowTop}>
        <div className={styles.TitleArea}>
          {ICONS_MAP[type]}
          <p className={styles.Message}>{message}</p>
        </div>

        <RemoveIcon className={styles.RemoveIcon} onClick={onClickHandler} />
      </div>

      <div className={styles.RowBottom}>{children}</div>
    </div>
  );
}

export default Alert;
