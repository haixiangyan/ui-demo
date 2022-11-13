import {FC, useEffect, useRef, useState} from "react";
import styles from './styles.module.scss';
import classNames from "classnames";

const ShuangDan: FC = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [active, setActive] = useState('effects');

  const secondRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (secondRef.current) {
      const { top } = secondRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);
    }
  }

  const activate = (key: string) => {
    setActive('key');
    const el = document.querySelector(`[data-id="${key}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [onScroll]);

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        first
      </div>
      <div className={styles.second} ref={secondRef}>
        <ul className={classNames(styles.header, { [styles.fixed]: isFixed })}>
          <li className={classNames({ [styles.active]: active === 'effects' })} onClick={() => activate('effects')}>
            Effects
            <span className={styles.line}></span>
          </li>
          <li className={classNames({ [styles.active]: active === 'stickers' })} onClick={() => activate('stickers')}>
            Stickers
            <span className={styles.line}></span>
          </li>
          <li className={classNames({ [styles.active]: active === 'transitions' })} onClick={() => activate('transitions')}>
            Transitions
            <span className={styles.line}></span>
          </li>
          <li className={classNames({ [styles.active]: active === 'filters' })} onClick={() => activate('filters')}>
            Filters
            <span className={styles.line}></span>
          </li>
        </ul>
        <div>
          <section data-id='effects'>effects</section>
          <section data-id='stickers'>stickers</section>
          <section data-id='transitions'>transitions</section>
          <section data-id='filters'>filters</section>
        </div>
      </div>
      <div className={styles.third}>
        third
        <div className={classNames(styles.purchaseBtn, { [styles.fixed]: isFixed })}>Btn</div>
      </div>
    </div>
  )
}

export default ShuangDan;
