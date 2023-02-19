import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartOverlay } from '../../contexts';

import styles from './PartOverlay.module.scss';

interface PartOverlayProps {
  scope: 'ColumnList';
}

function PartOverlay(props: PartOverlayProps) {
  const { scope } = props;
  const values = usePartOverlay();
  const navigate = useNavigate();

  const onClickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.className === styles.PartOverlay) {
      values[`setIsVisible${scope}`](false);

      if (window.location.pathname.includes('selected-task')) {
        const path = window.location.pathname.split('/').slice(0, -2).join('/');

        navigate(path);
      }
    }
  };

  return (
    <>
      {values[`isVisible${scope}`] && (
        <div
          className={styles.PartOverlay}
          style={{ display: values[`isVisible${scope}`] ? 'block' : 'none' }}
          onClick={onClickHandler}>
          {values[`children${scope}`]}
        </div>
      )}
    </>
  );
}

export default PartOverlay;
