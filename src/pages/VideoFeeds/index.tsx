import {FC, UIEventHandler, useCallback, useEffect, useRef, useState} from "react";
import NarBar from "./components/NarBar";
import styles from './styles.module.scss';
import {dataSource} from "./constants/data";
import FeedList from "./components/FeedList";
import classNames from "classnames";
import BannerImage from './assets/banner.png';
import FooterImage from './assets/footer.jpg';
import { debounce } from "lodash";
import {isInRange} from "./utils";
import Tabs from "./components/Tabs";

const VideoFeeds: FC = () => {
  const [navBarHidden, setNavBarHidden] = useState<boolean>(false);

  const dynamicIdsRef = useRef<string[]>([])
  const oldTopRef = useRef<number>(0);
  const isScrolling = useRef(false)

  const offsetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 暂停所有视频
  const pauseAllVideos = (ids: string[]) => {
    if (ids.length === 0) {
      return;
    }
    const pauseVideoElsSelector = ids.map(id => `[data-video-id="${id}"]`).join(',');
    const pauseVideoEls: HTMLVideoElement[] = Array.from(document.querySelectorAll(pauseVideoElsSelector));
    pauseVideoEls.forEach(videoEl => {
      videoEl.pause();
    });
  }

  // 给定 Video Id，停止所有
  const stopAll = (ids: string[]) => {
    if (ids.length === 0) {
      return;
    }
    const stopVideoElsSelector = ids.map(id => `[data-video-id="${id}"]`).join(',');
    const stopVideoEls: HTMLVideoElement[] = Array.from(document.querySelectorAll(stopVideoElsSelector));
    stopVideoEls.forEach(videoEl => {
      videoEl.pause();
      videoEl.currentTime = 0;
    })
  }

  // 给定 Video Id，开始播放
  const playAll = async (ids: string[]) => {
    // ids 长度为不能 0
    if (ids.length === 0) {
      return;
    }

    const playVideoElsSelector = ids.map(id => `[data-video-id="${id}"]`).join(',');

    const playVideoEls: HTMLVideoElement[] = Array.from(document.querySelectorAll(playVideoElsSelector));
    await Promise.all(playVideoEls.map(videoEl => videoEl.play()));

    // 有更新
    if (dynamicIdsRef.current !== ids) {
      // 更新当前播放 Ids
      dynamicIdsRef.current = ids;
    }
  }

  // 自动播放命中视频
  // 注意：这里一定要用 useCallback，否则会一直生成新的函数
  // https://stackoverflow.com/questions/56390614/ember-debounce-called-multiple-times-on-scroll-event-listener
  const autoPlayVideos = useCallback(debounce(async () => {
    // 这里可以再精确一点
    const videoEls = Array.from(document.querySelectorAll('video'));
    const exposureVideoEls = videoEls.filter(el => isInRange(el.getBoundingClientRect()).result);

    if (exposureVideoEls.length > 0) {
      // 有新的命中目标
      const ids = exposureVideoEls.map(el => el.getAttribute('data-video-id') || '');

      // 原来播放的内容要暂停
      const stopIds = dynamicIdsRef.current.filter(id => !ids.includes(id));

      // 暂停所有
      stopAll(stopIds);

      // 需要播放的内容
      await playAll(ids);
    } else {
      await playAll(dynamicIdsRef.current);
    }

    isScrolling.current = false;
  }, 200), []);

  // 纵向滚动
  const onScroll: UIEventHandler<HTMLDivElement> = useCallback(async () => {
    if (!isScrolling.current) {
      pauseAllVideos(dynamicIdsRef.current);
    }

    isScrolling.current = true;

    // 隐藏 NavBar
    if (contentRef.current) {
      const { top: newTop } = contentRef.current.getBoundingClientRect();
      const delta = newTop - oldTopRef.current;

      oldTopRef.current = newTop;

      // 只有滚动超过 offset 才做交互
      if (offsetRef.current) {
        const { bottom: offsetBottom } = offsetRef.current.getBoundingClientRect();
        if (offsetBottom <= 0) {
          setNavBarHidden(delta < 0);
        }
      }
    }

    // 自动播放视频
    await autoPlayVideos();
  }, []);

  useEffect(() => {
    playAll(dataSource.hot.list.slice(0, 2).map(item => item.id)).then();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.line}/>

      <header className={classNames(styles.header, { [styles.collapse]: navBarHidden })}>
        <NarBar title="首页" />

        <Tabs />
      </header>

      <div className={styles.wrapper} onScroll={onScroll}>
        <div ref={offsetRef} style={{ height: 2 * 56, width: '100%' }}></div>

        <img className={styles.banner} src={BannerImage} alt="Banner"/>

        <div className={styles.content} ref={contentRef}>
          <h2>{dataSource.hot.title}</h2>
          <FeedList onScroll={onScroll} listId={dataSource.hot.id} list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>
          <FeedList onScroll={onScroll} listId={dataSource.live.id} list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>
          <FeedList onScroll={onScroll} listId={dataSource.recommend.id} list={dataSource.recommend.list} />
        </div>

        <img className={styles.banner} src={FooterImage} alt="footer"/>

        <footer>
          <span>@Bilibili 2022</span>
        </footer>
      </div>
    </div>
  )
}

export default VideoFeeds;
