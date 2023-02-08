import { BtnAction } from '../';
import { colorBackgroundActiveMenu, colorContentActiveMenu } from '../../../../theme/variables';
import { MdMoreHoriz } from 'react-icons/md';
import useComponentVisible from '../../../../hooks/useComponentVisible/useComponentVisible';

import styles from './BtnMenuAction.module.scss';
import { useEffect } from 'react';

interface BtnMenuActionProps {
  options: string[];
  btnBackgrColorDefault?: string;
  btnBackgrColorHover: string;
  btnBackgrColorActive: string;
  onAciveMenu?: (value: boolean) => void;
}

function BtnMenuAction(props: BtnMenuActionProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  useEffect(() => {
    if (props.onAciveMenu) props.onAciveMenu(isComponentVisible);
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
          {props.options.map((option, idx) => (
            <div className={styles['menu__option']} key={idx}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BtnMenuAction;
