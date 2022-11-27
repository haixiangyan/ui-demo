import {FC, HTMLAttributes} from "react";
import styles from './styles.module.scss';
import {LeftOutlined} from "@ant-design/icons";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string; // 标题
  hidden?: boolean; // 是否可见
}

const NavBar: FC<Props> = (props) => {
  const { hidden = true, title, className, ...restProps } = props;

  return (
    <nav {...restProps} className={classNames(styles.navBar, className, { [styles.hidden]: hidden })}>
      <LeftOutlined className={styles.goBackIcon} />

      <span className={styles.title}>{title}</span>
    </nav>
  )
}

export default NavBar;
