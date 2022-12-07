import {FC} from "react";
import CancelModal, {MaterialStyles} from "./CancelModal";

// 初始化的物料样式
const initMaterialStyles: MaterialStyles[] = [
  {
    id: '1',
    background: 'yellow',
    top: '50%',
    left: '40%',
    width: 30,
    height: 30,
  },
  {
    id: '2',
    background: 'purple',
    top: '50%',
    left: '45%',
    width: 30,
    height: 30,
  },
  {
    id: '3',
    background: 'pink',
    top: '50%',
    left: '50%',
    width: 30,
    height: 30,
  },
  {
    id: '4',
    background: 'blue',
    top: '50%',
    left: '55%',
    width: 30,
    height: 30,
  }
]

const RedPacket: FC = () => {
  return (
    <CancelModal initMaterialStyles={initMaterialStyles} />
  )
}

export default RedPacket;
