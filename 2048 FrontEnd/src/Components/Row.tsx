import styles from "../Styles/Row.module.css";
const Row = () => {
  return (
    <div className={styles.Row}>
      <div className={styles.Cell}></div>
      <div className={styles.Cell}></div>
      <div className={styles.Cell}></div>
      <div className={styles.Cell}></div>
    </div>
  );
};

export default Row;
