import {FC, useEffect, useMemo, useState} from "react";
import styles from './styles.module.scss';
import {getRandomNumber} from "./utils";
import NumberDisplay from "./components/NumberDisplay";
import dayjs from "dayjs";
import CancelModal, {MaterialStyles} from "./components/CancelModal";

// 初始化的物料样式
const initMaterialStyles: MaterialStyles[] = [
  {
    background: 'yellow',
    top: '50%',
    left: '40%',
    width: 30,
    height: 30,
  },
  {
    background: 'purple',
    top: '50%',
    left: '45%',
    width: 30,
    height: 30,
  },
  {
    background: 'pink',
    top: '50%',
    left: '50%',
    width: 30,
    height: 30,
  },
  {
    background: 'blue',
    top: '50%',
    left: '55%',
    width: 30,
    height: 30,
  }
]

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

      <CancelModal initMaterialStyles={initMaterialStyles} />

      {/*<button style={{ marginLeft: 20 }} onClick={add}>+1</button>*/}
    </div>
  )
}

export default PriceNumber;
