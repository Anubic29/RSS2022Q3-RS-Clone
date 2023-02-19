import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOverlay } from '../../contexts';

import styles from './Overlay.module.scss';

interface OverlayProps {
  scope: 'App' | 'Board';
}

function Overlay(props: OverlayProps) {
  const { scope } = props;
  const values = useOverlay();
  const navigate = useNavigate();

  const onClickHandler = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.className === styles.Overlay) {
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
          className={styles.Overlay}
          style={{ display: values[`isVisible${scope}`] ? 'block' : 'none' }}
          onClick={onClickHandler}>
          {values[`children${scope}`]}
        </div>
      )}
    </>
  );
}

export default Overlay;
