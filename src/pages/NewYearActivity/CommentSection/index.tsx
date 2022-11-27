import {FC} from "react";
import styles from './styles.module.scss';
import title1Image from '../assets/title1.jpg';
import title2Image from '../assets/title2.jpg';
import commentImage from '../assets/comment.jpg';
import classNames from "classnames";
import logoImage from '../assets/logo.png';

interface Props {
  isFixed: boolean;
}

const CommentSection: FC<Props> = (props) => {
  const { isFixed } = props;

  return (
    <div className={styles.commentSection}>
      <img className={styles.title} src={title1Image} alt="标题1"/>

      <img className={styles.comment} src={commentImage} alt="评论"/>

      <img className={styles.title} src={title2Image} alt="标题2"/>

      <img className={styles.comment} src={commentImage} alt="评论"/>

      <div className={classNames(styles.btnWrapper, { [styles.fixed]: isFixed })}>
        <img src={logoImage} alt="LOGO"/>
        <a href="https://www.bilibili.com/" target="_blank">
          <button>App 内打开</button>
        </a>
      </div>
    </div>
  )
}

export default CommentSection;
