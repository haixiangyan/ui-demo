import {FC, UIEventHandler, useCallback, useEffect, useRef, useState} from "react";
import NarBar from "./components/NarBar";
import styles from './styles.module.scss';
import {dataSource} from "./constants/data";
import FeedList from "./components/FeedList";
import classNames from "classnames";
import BannerImage from './assets/banner.png';
import FooterImage from './assets/footer.jpg';
import { debounce } from "lodash";

const VideoFeeds: FC = () => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [navBarHidden, setNavBarHidden] = useState<boolean>(false);

  const dynamicIdsRef = useRef<string[]>([])
  const contentRef = useRef<HTMLDivElement>(null);
  const oldTopRef = useRef<number>(0);

  // 暂停所有视频
  const pauseAllVideos = (ids: string[]) => {
    ids.forEach(id => {
      const videoEl: HTMLVideoElement | null = document.querySelector(`[data-video-id="${id}"]`)
      videoEl!.pause();
    })
  }

  // 给定 Video Id，停止所有
  const stopAll = (ids: string[]) => {
    const stopVideoElsSelector = ids.map(id => `[data-video-id="${id}"]`).join(',');
    if (stopVideoElsSelector) {
      const stopVideoEls: HTMLVideoElement[] = Array.from(document.querySelectorAll(stopVideoElsSelector));
      stopVideoEls.forEach(videoEl => {
        videoEl.currentTime = 0;
        videoEl.pause();
      })
    }
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
    // 检查所有 FeedList
    const midHeight = window.innerHeight / 2;

    const feedListEls = Array.from(document.querySelectorAll('[data-feed-list-id]'));
    const targetFeedListEl = feedListEls.find(el => {
      const { top } = el.getBoundingClientRect();

      return top <= midHeight && midHeight <= top + (16 * 2 + 240);
    })

    if (targetFeedListEl) {
      // 有新的命中目标
      const key = targetFeedListEl.getAttribute('data-feed-list-id') as ('hot' | 'live' | 'recommend')
      const ids = dataSource[key].list.map(item => item.id).slice(0, 2);

      // 原来播放的内容要暂停
      const stopIds = dynamicIdsRef.current.filter(id => !ids.includes(id));

      // 暂停所有
      stopAll(stopIds);

      // 需要播放的内容
      await playAll(ids);
    } else {
      await playAll(dynamicIdsRef.current);
    }

    setScrolling(false);
  }, 500), []);

  const onScroll: UIEventHandler<HTMLDivElement> = async () => {
    if (!scrolling) {
      pauseAllVideos(dynamicIdsRef.current);
    }

    setScrolling(true);

    // 隐藏 NavBar
    if (contentRef.current) {
      const { top: newTop } = contentRef.current.getBoundingClientRect();
      const delta = newTop - oldTopRef.current;

      oldTopRef.current = newTop;

      setNavBarHidden(delta < 0);
    }

    // 自动播放视频
    await autoPlayVideos();
  };

  useEffect(() => {
    playAll(dataSource.hot.list.slice(0, 2).map(item => item.id)).then();
  }, []);

  return (
    <div className={styles.container}>
      <NarBar hidden={navBarHidden} title="首页" />

      <div className={styles.line}/>

      <div className={classNames(styles.wrapper, { [styles.hidden]: navBarHidden } )} onScroll={onScroll}>
        <img className={styles.banner} src={BannerImage} alt="Banner"/>

        <div className={styles.content} ref={contentRef}>
          <h2>{dataSource.hot.title}</h2>
          <FeedList listId={dataSource.hot.id} list={dataSource.hot.list} />

          <h2>{dataSource.live.title}</h2>
          <FeedList listId={dataSource.live.id} list={dataSource.live.list} />

          <h2>{dataSource.recommend.title}</h2>
          <FeedList listId={dataSource.recommend.id} list={dataSource.recommend.list} />
        </div>

        <img className={styles.banner} src={FooterImage} alt="footer"/>

        <footer>
          <span>@Bilbili 2022</span>
        </footer>
      </div>
    </div>
  )
}

export default VideoFeeds;
