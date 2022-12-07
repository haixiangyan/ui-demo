import {FC} from "react";
import styles from "./styles.module.scss";

const digitRegExp = /\d/;
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Props {
  stringList: string[]; // 数字字符串数组 e.g. ['1', '2']
}

const NumberDisplay: FC<Props> = (props) => {
  const { stringList } = props;

  return (
    <ul className={styles.numberDisplay}>
      {stringList.map((str, index) => (
        <li key={index} className={styles.digitWrapper}>
          {digitRegExp.test(str) ? (
            <span className={styles.digit} style={{ transform: `translate(-50%,-${Number(str) * 10}%)` }}>
              {digits.map((digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          ) : (
            <span className={styles.digit}>{str}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default NumberDisplay;
