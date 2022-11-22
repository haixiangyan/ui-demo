import {FC, useEffect, useRef, useState} from "react";
import styles from './styles.module.scss';
import classNames from "classnames";

import foodImage from '../assets/food.jpg';
import movieImage from '../assets/movie.png';
import lifeImage from '../assets/life.jpg';
import cartoonImage from '../assets/cartoon.jpg';

const offset = 10;
const tabHeight = 64;

enum TabKey {
  Cartoon = 'cartoon',
  Food = 'food',
  Movie = 'movie',
  Life = 'life',
}

const tabs = [
  {
    key: TabKey.Cartoon,
    title: '动画',
    image: cartoonImage,
  },
  {
    key: TabKey.Food,
    title: '美食',
    image: foodImage,
  },
  {
    key: TabKey.Movie,
    title: '电影',
    image: movieImage,
  },
  {
    key: TabKey.Life,
    title: '生活',
    image: lifeImage,
  },
]

interface Props {
  isFixed: boolean;
  setIsFixed: (isFixed: boolean) => void;
}

const VideoSection: FC<Props> = (props) => {
  const { isFixed, setIsFixed } = props;

  const [active, setActive] = useState('effects');

  const sectionRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (sectionRef.current) {
      // 控制 Header
      const { top } = sectionRef.current.getBoundingClientRect();
      setIsFixed(top <= 0);

      // 监听其它 section
      const sections = sectionRef.current.querySelectorAll('section');

      Array.from(sections).forEach(sectionEl => {
        if (sectionEl.getBoundingClientRect().top <= tabHeight + offset) {
          const key: string = sectionEl.getAttribute('data-id') || '';
          setActive(key);
        }
      })
    }
  }

  const activate = (key: string) => {
    setActive(key);
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
    <div className={styles.videoSection} ref={sectionRef}>
      {/*Tabs*/}
      <ul className={classNames(styles.header, { [styles.fixed]: isFixed })}>
        {
          tabs.map(tab => (
            <li key={tab.key} className={classNames({ [styles.active]: active === tab.key })} onClick={() => activate(tab.key)}>
              {tab.title}
              <span className={styles.line}></span>
            </li>
          ))
        }
      </ul>

      {/*内容*/}
      <div>
        {tabs.map(tab => (
          <section key={tab.key} data-id={tab.key}>
            <h2>{tab.title}</h2>
            <a href="https://www.bilibili.com/" target="_blank">
              <img src={tab.image} alt={tab.title}/>
            </a>
          </section>
        ))}
      </div>
    </div>
  )
}

export default VideoSection;
