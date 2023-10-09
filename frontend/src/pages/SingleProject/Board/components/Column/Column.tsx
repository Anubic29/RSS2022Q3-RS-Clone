import styles from './Column.module.scss';

interface ColumnProps {
  children: React.ReactNode;
}

function Column(props: ColumnProps) {
  return <div className={styles['column']}>{props.children}</div>;
}

export default Column;
