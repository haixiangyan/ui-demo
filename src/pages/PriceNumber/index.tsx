import {FC, useEffect, useMemo, useState} from "react";
import styles from './styles.module.scss';
import {digits, getRandomNumber} from "./utils";

const PriceNumber: FC = () => {
  const [number, setNumber] = useState<number>(0);

  const numberStrArr: string[] = useMemo(() => {
    return (number / 100).toFixed(2).split('');
  }, [number]);

  useEffect(() => {
    setInterval(() => {
      setNumber(getRandomNumber(0, 999));
    }, 2000);
  }, []);

  // const add = () => {
  //   const nextNumber = number + 1;
  //   console.log(nextNumber);
  //   setNumber(nextNumber);
  // }

  return (
    <div className={styles.priceNumber}>

      {/* Number 大数字 */}
      <ul className={styles.numberDisplay}>
        {numberStrArr.map((str, index) => (
          <li key={index} className={styles.digitWrapper}>
            {str === '.' ? (
              <span className={styles.digit}>.</span>
            ) : (
              <span className={styles.digit} style={{ transform: `translate(-50%,-${Number(str) * 10}%)` }}>
                {digits.map((digit) => (
                  <span key={digit}>{digit}</span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/*<button style={{ marginLeft: 20 }} onClick={add}>+1</button>*/}
    </div>
  )
}

export default PriceNumber;
