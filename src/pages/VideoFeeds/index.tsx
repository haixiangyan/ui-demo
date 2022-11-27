import {FC, UIEventHandler, useRef, useState} from "react";
import NarBar from "./components/NarBar";
import styles from './styles.module.scss';

const VideoFeeds: FC = () => {
  const [navBarHidden, setNavBarHidden] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const oldTopRef = useRef<number>(0);

  const onScroll: UIEventHandler<HTMLDivElement> = () => {
    if (contentRef.current) {
      const { top: newTop } = contentRef.current.getBoundingClientRect();
      const delta = newTop - oldTopRef.current;

      oldTopRef.current = newTop;

      if (delta < 0) {
        // 向上滑动
        setNavBarHidden(true);
      } else {
        // 向下滑动
        setNavBarHidden(false);
      }
    }
  }

  return (
    <div className={styles.container}>
      <NarBar hidden={navBarHidden} title="首页" />

      <div className={styles.wrapper} onScroll={onScroll}>
        <div className={styles.content} ref={contentRef}>
          VideoFeeds
        </div>
      </div>
    </div>
  )
}

export default VideoFeeds;
