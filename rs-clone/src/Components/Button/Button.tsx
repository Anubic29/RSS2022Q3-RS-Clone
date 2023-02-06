import Styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { children, className } = props;
  const classNames = className ? `${Styles.Button} ${className}` : Styles.Button;

  return (
    <button {...props} className={classNames}>
      {children}
    </button>
  );
}

export default Button;
