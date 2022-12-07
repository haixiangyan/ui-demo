import {CSSProperties, FC, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

const materialList: CSSProperties[] = [
  {
    background: 'yellow',
    top: '50%',
    left: '10%',
  },
  {
    background: 'purple',
    top: '50%',
    left: '20%',
  },
  {
    background: 'pink',
    top: '50%',
    left: '30%',
  },
  {
    background: 'blue',
    top: '50%',
    left: '40%',
  }
]

const CancelModal: FC = () => {
  const [hideImage, setHideImage] = useState<boolean>(false);
  const [finalPosition, setFinalPosition] = useState<CSSProperties>({});
  const [imagePosition, setImagePosition] = useState<CSSProperties>({});

  const onClose = () => {
    const offset = 20;
    // 获取目标的 top left
    const { top: targetTop, left: targetLeft, bottom: targetBottom } = document.querySelector('#item')!.getBoundingClientRect();
    // 获取图片的 top left
    const { top: imageTop, width: imageWidth, bottom: imageBottom } = document.querySelector('#image')!.getBoundingClientRect();
    // 计算物料的位置
    setFinalPosition({ top: targetTop + offset, left: targetLeft + offset })
    // 计算图片的位置
    const middle = (imageTop + imageBottom) / 2;
    const commonStyles: CSSProperties = {
      left: targetLeft + imageWidth / 2,
    }
    setImagePosition(commonStyles);
    if (targetBottom < middle) {
      // 上
      setImagePosition({ transformOrigin: 'left top', ...commonStyles })
    } else if (targetTop > middle) {
      // 下
      setImagePosition({ transformOrigin: 'left bottom', ...commonStyles })
    } else {
      // 中
      setImagePosition({ transformOrigin: 'left center', ...commonStyles })
    }
    // 隐藏
    setHideImage(true);
  }

  return (
    <div>
      <div
        id="image"
        style={imagePosition}
        className={classNames(styles.image, {[styles.hide]: hideImage })}>
        图片
        <button onClick={onClose}>取消</button>
      </div>

      {materialList.map((material, index) => (
        <div
          style={{ ...material, ...finalPosition, transitionDelay: `${index * 100}ms`}}
          className={classNames(styles.material, styles.first, {[styles.hide]: hideImage})}
        />
      ))}

      <ul className={styles.list}>
        <li id="item">9.99</li>
        <li>24.99</li>
        <li>49.99</li>
      </ul>
    </div>
  )
}

export default CancelModal;
