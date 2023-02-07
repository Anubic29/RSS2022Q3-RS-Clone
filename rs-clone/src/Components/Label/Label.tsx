import Styles from './Label.module.scss';

interface LabelProps {
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
  required?: boolean;
  text?: string;
}

function Label(props: LabelProps) {
  const { className, children, text, htmlFor, required } = props;
  const classNames = className ? `${Styles.Label} ${className}` : Styles.Label;

  return (
    <label className={classNames} htmlFor={htmlFor}>
      {text} {required && <span className={Styles.Required}>*</span>} {children}
    </label>
  );
}

export default Label;
