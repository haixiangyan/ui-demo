import {FC, useState} from "react";
import styles from './styles.module.scss';
import HomeSection from "./HomeSection";
import VideoSection from "./VideoSection";
import CommentSection from "./CommentSection";

const ActivityPage: FC = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <HomeSection />

      <VideoSection isFixed={isFixed} setIsFixed={setIsFixed} />

      <CommentSection isFixed={isFixed} />
    </div>
  )
}

export default ActivityPage;
