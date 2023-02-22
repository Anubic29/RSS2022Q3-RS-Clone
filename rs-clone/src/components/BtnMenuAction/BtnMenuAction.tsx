import { BtnAction } from '../';
import { colorBackgroundActiveMenu, colorContentActiveMenu } from '../../theme/variables';
import { MdMoreHoriz } from 'react-icons/md';
import useComponentVisible from '../../hooks/useComponentVisible/useComponentVisible';

import styles from './BtnMenuAction.module.scss';
import { useEffect } from 'react';
import { IconType } from 'react-icons';

type Option = {
  title: string;
  callback: () => void;
  blocked?: boolean;
};

interface BtnMenuActionProps {
  options: Option[];
  btnBackgrColorDefault?: string;
  btnBackgrColorHover: string;
  btnBackgrColorActive: string;
  onActiveMenu?: (value: boolean) => void;
  backgrColorImportant?: string;
  image?: IconType;
  colorImg?: string;
}

function BtnMenuAction(props: BtnMenuActionProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    if (props.onActiveMenu) props.onActiveMenu(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <div className={styles.menu} ref={ref}>
      <div
        className={styles['menu__btn']}
        onClick={() => setIsComponentVisible(!isComponentVisible)}>
        <BtnAction
          image={MdMoreHoriz}
          backgrColorHover={props.btnBackgrColorHover}
          backgrColorActive={props.btnBackgrColorActive}
          backgrColorImportant={isComponentVisible ? colorBackgroundActiveMenu : undefined}
          colorImg={isComponentVisible ? colorContentActiveMenu : undefined}
        />
      </div>
      {isComponentVisible && (
        <div className={styles['menu__list']}>
          {props.options.map((option, idx) => {
            const attributes = {
              className: !option.blocked
                ? styles['menu__option']
                : `${styles['menu__option']} ${styles['menu__option--blocked']}`,
              onClick: !option.blocked
                ? () => {
                    option.callback();
                    setIsComponentVisible(false);
                  }
                : undefined
            };
            return (
              <div key={idx} {...attributes}>
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
