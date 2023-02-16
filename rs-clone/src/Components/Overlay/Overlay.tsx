import { useOverlay } from '../../contexts';
import Styles from './Overlay.module.scss';
import { useNavigate } from 'react-router-dom';

interface OverlayProps {
  scope: 'App' | 'Board';
}

function Overlay(props: OverlayProps) {
  const { scope } = props;

  const values = useOverlay();
  const navigate = useNavigate();

  const onClickHandler = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).className === Styles.Overlay) {
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
          className={Styles.Overlay}
          style={{ display: values[`isVisible${scope}`] ? 'block' : 'none' }}
          onClick={onClickHandler}>
          {values[`children${scope}`]}
        </div>
      )}
    </>
  );
}

export default Overlay;
