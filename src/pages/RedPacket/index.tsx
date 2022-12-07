import {FC, useState} from "react";
import CancelModal, {Material} from "./CancelModal";
import styles from './styles.module.scss';

import RedPacketBg from './assets/red-packet.png';

import Coin1 from './assets/coin1.png';
import Coin2 from './assets/coin2.png';

// 初始化的物料样式
const initMaterialStyles: Material[] = [
  {
    id: '1',
    src: Coin1,
    style: {
      top: '60%',
      left: '10%',
      width: 50,
      height: 50,
    }
  },
  {
    id: '2',
    src: Coin2,
    style: {
      top: '70%',
      left: '35%',
      width: 50,
      height: 50,
    }
  },
  {
    id: '3',
    src: Coin1,
    style: {
      top: '50%',
      left: '50%',
      width: 50,
      height: 50,
    }
  },
  {
    id: '4',
    src: Coin2,
    style: {
      top: '60%',
      left: '95%',
      width: 50,
      height: 50,
    }
  }
]

const RedPacket: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>打开</button>

      <CancelModal visible={visible} onClose={() => setVisible(false)} background={RedPacketBg} initMaterialList={initMaterialStyles} />

      <ul className={styles.list}>
        <li>日价 9.99</li>
        <li id="item">月价 24.99</li>
        <li>年价49.99</li>
      </ul>
    </div>
  )
}

export default RedPacket;
