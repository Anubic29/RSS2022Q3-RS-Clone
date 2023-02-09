import Styles from './DropdownButton.module.scss';

interface DropdownButtonProps {
  className?: string;
  onClick?: () => void;
}

function DropdownButton(props: DropdownButtonProps) {
  const { onClick } = props;

  return (
    <div className={Styles.Dropdown} onClick={onClick}>
      <span className={Styles.DropdownItem}></span>
      <span className={Styles.DropdownItem}></span>
      <span className={Styles.DropdownItem}></span>
    </div>
  );
}

export default DropdownButton;
