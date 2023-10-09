import React, { useCallback, useMemo, useRef } from 'react';

import styles from './Overlay.module.scss';

interface OverlayProps {
  additionalType?: 'part-overlay';
  children?: React.ReactNode;
  isVisible: boolean;
  onClick: () => void;
}

function Overlay(props: OverlayProps) {
  const refOverlay = useRef<HTMLDivElement>(null);

  const className = useMemo(() => {
    let str = styles['overlay'];
    if (props.additionalType) str += ` ${styles[props.additionalType]}`;
    return str;
  }, [props.additionalType]);

  const onClickHandler = useCallback((event: React.MouseEvent) => {
    if (event.target === refOverlay.current) props.onClick();
  }, []);

  return (
    <>
      {props.isVisible && (
        <div className={className} onClick={onClickHandler} ref={refOverlay}>
          {props.children}
        </div>
      )}
    </>
  );
}

export default Overlay;
