import BtnAction from '../BtnAction/BtnAction';
import { colorBackgroundActiveMenu, colorContentActiveMenu } from '../../../../theme/variables';
import { MdMoreHoriz } from 'react-icons/md';
import useComponentVisible from '../../../../hooks/useComponentVisible/useComponentVisible';

import styles from './BtnMenuAction.module.scss';

interface BtnMenuActionProps {
  options: string[];
  btnBackgrColorDefault?: string;
  btnBackgrColorHover: string;
  btnBackgrColorActive: string;
}

function BtnMenuAction(props: BtnMenuActionProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

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
