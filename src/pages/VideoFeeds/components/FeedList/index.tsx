import {FC} from "react";
import {VideoData} from "../../constants/data";
import styles from './styles.module.scss';

interface Props {
  listId: string;
  list: VideoData[];
}

const Feed: FC<Props> = (props) => {
  const { listId, list } = props;

  return (
    <div data-feed-list-id={listId} className={styles.wrapper}>
      <ul className={styles.feedList}>
        {list.map(video => (
          <li key={video.id}>
            <video data-video-id={video.id} loop muted src={video.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Feed;
