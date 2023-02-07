import Styles from './Input.module.scss';

interface InputProps {
  id: string;
  type: 'text';
  className?: string;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  required?: boolean;
}

function Input(props: InputProps) {
  const { className } = props;
  const classNames = className ? `${Styles.Input} ${className}` : Styles.Input;

  return <input {...props} className={classNames} />;
}

export default Input;
