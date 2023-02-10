import { useContext } from 'react';
import { OverlayContext } from '../../contexts';
import Styles from './Overlay.module.scss';

interface OverlayProps {
  children: React.ReactNode;
  isVisible: boolean;
}

function Overlay(props: OverlayProps) {
  const { children, isVisible } = props;
  const { setIsVisible } = useContext(OverlayContext);

  const onClickHandler = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={Styles.Overlay}
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={onClickHandler}>
      {children}
    </div>
  );
}

export default Overlay;
