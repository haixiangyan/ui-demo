import {FC} from "react";
import styles from './styles.module.scss';
import classNames from "classnames";

interface Props {
  isFixed: boolean;
}

const Tabs: FC<Props> = (props) => {
  const { isFixed } = props;

  return (
    <ul className={classNames(styles.tabs, { [styles.isFixed]: isFixed })}>
      <li>大会员</li>
      <li>消息</li>
      <li>动态</li>
    </ul>
  )
}

export default Tabs;
