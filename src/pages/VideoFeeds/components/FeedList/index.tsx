import {FC} from "react";
import {VideoData} from "../../constants/data";
import styles from './styles.module.scss';

interface Props {
  list: VideoData[];
}

const Feed: FC<Props> = (props) => {
  const { list } = props;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.feedList}>
        {list.map(video => (
          <li key={video.id} data-video-id={`video-${video.id}`}>
            <video src={video.src} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Feed;
