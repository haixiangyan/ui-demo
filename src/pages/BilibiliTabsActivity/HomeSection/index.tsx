import {FC} from "react";
import styles from './styles.module.scss';
import BannerImage from '../assets/banner.jpg';

const HomeSection: FC = () => {
  return (
    <div className={styles.homeSection}>
      <img className={styles.banner} src={BannerImage} alt="Banner"/>
    </div>
  )
}

export default HomeSection;
