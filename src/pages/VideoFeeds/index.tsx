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
    // 隐藏 NavBar
    if (contentRef.current) {
      const { top: newTop } = contentRef.current.getBoundingClientRect();
      const delta = newTop - oldTopRef.current;

      oldTopRef.current = newTop;

      setNavBarHidden(delta < 0);
    }

    // 检查所有 FeedList
    const midHeight = window.innerHeight / 2;

    const feedListEls = Array.from(document.querySelectorAll('[data-feed-list-id]'));
    const targetFeedListEl = feedListEls.find(el => {
      const { top } = el.getBoundingClientRect();

      return top <= midHeight && midHeight <= top + (16 * 2 + 240);
    })

    if (targetFeedListEl) {
      const videoEls: HTMLVideoElement[] = Array.from(targetFeedListEl.querySelectorAll('video'));
      console.log('video', videoEls);

      // 前两个
      videoEls[0]?.play();
      videoEls[1]?.play();
      // videoEls[0]?.setAttribute('autoplay', "true");
      // videoEls[1]?.setAttribute('autoplay', "true");
    }
  }

  return (
    <div className={styles.container}>
      <NarBar hidden={navBarHidden} title="首页" />

      <div className={classNames(styles.wrapper, { [styles.hidden]: navBarHidden } )} onScroll={onScroll}>
        <div className={styles.content} ref={contentRef}>
          <h2>热门视频</h2>
          <FeedList id="hot" list={videoList1} />

          <h2>生活</h2>
          <FeedList id="life" list={videoList1} />

          <h2>影视</h2>
          <FeedList id="movie" list={videoList1} />
        </div>
      </div>
    </div>
  )
}

export default VideoFeeds;
