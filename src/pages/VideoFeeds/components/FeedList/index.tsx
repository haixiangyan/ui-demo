import {FC} from "react";
import {VideoData} from "../../constants/data";
import styles from './styles.module.scss';

interface Props {
  id: string;
  list: VideoData[];
}

const Feed: FC<Props> = (props) => {
  const { id, list } = props;

  return (
    <div data-feed-list-id={id} className={styles.wrapper}>
      <ul className={styles.feedList}>
        {list.map(video => (
          <li key={video.id} data-video-id={`video-${video.id}`}>
            <video loop muted src={video.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Feed;
