import { ChangeEvent, useEffect, useState } from "react";
import styles from "../Styles/Scoreboard.module.css";
import Score from "./Score";
const Scoreboard = ({}) => {
  const [query, setQuery] = useState("");
  const [results, SetResults] = useState<any>([]);
  const [connection, setConnection] = useState(true);
  useEffect(() => {
    async function getQuery() {
      try {
        if (query.length) {
          let response = await fetch(
            `http://localhost:3000/api/search?query=${query}`,
            {
              method: "GET",
              signal: AbortSignal.timeout(3000),
            }
          );
          let res = await response.json();
          SetResults(res);
        } else {
          let response = await fetch(`http://localhost:3000/api/getTop10`, {
            method: "GET",
            signal: AbortSignal.timeout(3000),
          });
          let res = await response.json();
          SetResults(res);
        }
        setConnection(true);
      } catch (err) {
        setConnection(false);
      }
    }
    getQuery();
  }, [query]);
  return (
    <div className={styles.ScoreboardContainer}>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        value={query}
        className={styles.input}
        placeholder="Showing top 10, type to search others..."
      ></input>
      {connection ? (
        <div>
          {results.map((score: any) => (
            <Score key={score._id} name={score.name} score={score.score} />
          ))}
        </div>
      ) : (
        <div>Can`t connect to server</div>
      )}
    </div>
  );
};

export default Scoreboard;
