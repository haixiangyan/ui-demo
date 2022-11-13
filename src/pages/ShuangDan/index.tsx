import {FC, useRef, useState} from "react";
import styles from './styles.module.scss';
import classNames from "classnames";

const ShuangDan: FC = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const secondRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (secondRef.current) {
      const { top } = secondRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);
    }
  }

  return (
    <div className={styles.container} onScroll={onScroll}>
      <div className={styles.first}>
        first
      </div>
      <div className={styles.second} ref={secondRef}>
        <div className={classNames(styles.header, { [styles.fixed]: isFixed })}>header</div>
        second
      </div>
      <div className={styles.third}>
        third
        <div className={classNames(styles.purchaseBtn, { [styles.fixed]: isFixed })}>Btn</div>
      </div>
    </div>
  )
}

export default ShuangDan;
