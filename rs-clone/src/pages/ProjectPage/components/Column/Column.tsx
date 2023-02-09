import styles from './Column.module.scss';

interface ColumnProps {
  children: React.ReactNode;
}

function Column(props: ColumnProps) {
  return (
    <div className={styles['column-container']}>
      <div className={styles.column}>{props.children}</div>
    </div>
  );
}

export default Column;
