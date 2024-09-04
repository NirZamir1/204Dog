import styles from "../Styles/Score.module.css";
const Score = ({ score, name }: { score: number; name: string }) => {
  return (
    <div className={styles.ScoreContainer}>
      <span className={styles.ScoreName}>{name}</span>
      <span className={styles.Score}>score: {score}</span>
    </div>
  );
};

export default Score;
