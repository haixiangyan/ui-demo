import {FC, useEffect, useMemo, useState} from "react";
import styles from './styles.module.scss';
import {getRandomNumber} from "./utils";
import NumberDisplay from "./components/NumberDisplay";
import dayjs from "dayjs";

const PriceNumber: FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [time, setTime] = useState<number>(Date.now().valueOf());

  const numberStrArr: string[] = useMemo(() => {
    return (number / 100).toFixed(2).split('');
  }, [number]);

  const timeStr = useMemo(() => {
    return dayjs(time).format('HH:mm:ss').split('');
  }, [time]);

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now().valueOf());
    }, 1000);
  }, []);

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

      {/*<NumberDisplay stringList={numberStrArr} />*/}

      <NumberDisplay stringList={timeStr} />

      {/*<button style={{ marginLeft: 20 }} onClick={add}>+1</button>*/}
    </div>
  )
}

export default PriceNumber;
