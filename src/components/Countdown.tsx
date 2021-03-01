import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";
import { getSplitedTime } from "../utils/getSplitedTime";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const countdownTime = 0.05 * 60;

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(countdownTime);
  const [isActiveCountdown, setIsActiveCountdown] = useState(false);
  const [hasFinishedCountdown, setHasFinishedCountdown] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = getSplitedTime(minutes);
  const [secondLeft, secondRight] = getSplitedTime(seconds);

  function startCountdown() {
    setIsActiveCountdown(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActiveCountdown(false);
    setTime(countdownTime);
  }

  useEffect(() => {
    if (isActiveCountdown && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActiveCountdown && time === 0) {
      setHasFinishedCountdown(true);
      setIsActiveCountdown(false);
      startNewChallenge();
    }
  }, [isActiveCountdown, time]);

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinishedCountdown ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActiveCountdown ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar o ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
}
