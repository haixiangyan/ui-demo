import {FC, UIEventHandler, useRef, useState} from "react";
import NarBar from "./components/NarBar";
import styles from './styles.module.scss';
import {videoList1} from "./constants/data";
import FeedList from "./components/FeedList";
import classNames from "classnames";

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

      <div className={classNames(styles.wrapper, { [styles.hidden]: navBarHidden } )} onScroll={onScroll}>
        <div className={styles.content} ref={contentRef}>
          <h2>热门视频</h2>
          <FeedList list={videoList1} />

          <h2>追番</h2>
          <FeedList list={videoList1} />

          <h2>影视</h2>
          <FeedList list={videoList1} />
        </div>
      </div>
    </div>
  )
}

export default VideoFeeds;
