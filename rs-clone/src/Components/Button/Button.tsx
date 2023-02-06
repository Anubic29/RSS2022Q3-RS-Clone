interface ButtonProps {
  styles?: {
    [key: string]: string;
  };
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

function Button(props: ButtonProps) {
  // const { styles, children, type, className } = props;

  return <button {...props}></button>;
}

export default Button;
