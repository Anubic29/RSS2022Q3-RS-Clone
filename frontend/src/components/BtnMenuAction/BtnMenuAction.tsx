import React, { useEffect } from 'react';
import { useComponentVisible } from '../../hooks';
import { BtnAction } from '../';

import { MdMoreHoriz } from 'react-icons/md';

import styles from './BtnMenuAction.module.scss';

import type { BtnActionClassType } from '../BtnAction/BtnAction';

type Option = {
  title: string;
  callback: () => void;
  blocked?: boolean;
};

interface BtnMenuActionProps {
  options: Option[];
  btnClassType?: BtnActionClassType;
  onActiveMenu?: (value: boolean) => void;
}

function BtnMenuAction(props: BtnMenuActionProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    if (props.onActiveMenu) props.onActiveMenu(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <div className={styles['menu']} ref={ref}>
      <BtnAction
        image={MdMoreHoriz}
        btnClassType={props.btnClassType}
        className={isComponentVisible ? styles['active-btn'] : undefined}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      />
      {isComponentVisible && (
        <div className={styles['list']}>
          {props.options.map((option, idx) => {
            let optClassName = styles['option'];
            if (option.blocked) optClassName += ` ${styles['blocked']}`;
            const optOnClick = !option.blocked
              ? () => {
                  option.callback();
                  setIsComponentVisible(false);
                }
              : undefined;
            return (
              <div key={`opt-${idx}`} className={optClassName} onClick={optOnClick}>
                {option.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BtnMenuAction;
