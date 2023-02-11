import { useOverlay } from '../../contexts';
import Styles from './Overlay.module.scss';

interface OverlayProps {
  scope: 'App' | 'Board';
}

function Overlay(props: OverlayProps) {
  const { scope } = props;
  const values = useOverlay();

  const onClickHandler = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).className === Styles.Overlay) {
      values[`setIsVisible${scope}`](false);
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
