import {CSSProperties, FC, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

export interface MaterialStyles {
  id: string;
  background: CSSProperties['background'];
  top: CSSProperties['top'];
  left: CSSProperties['left'];
  width: number;
  height: number;
  transform?: CSSProperties['transform'];
}

interface Props {
  initMaterialStyles: MaterialStyles[];
}

const getImageYOrigin = (targetTop: number, targetBottom: number, middle: number) => {
  if (targetBottom < middle) {
    // 上
    return 'top';
  } else if (targetTop > middle) {
    // 下
    return 'bottom';
  } else {
    // 中
    return 'center';
  }
}

const CancelModal: FC<Props> = (props) => {
  const { initMaterialStyles } = props;

  const [imageStyle, setImageStyle] = useState<CSSProperties>({});
  const [materialStyles, setMaterialStyles] = useState<MaterialStyles[]>(initMaterialStyles);
  const [disappear, setDisappear] = useState<boolean>(false);

  const onClose = () => {
    if (disappear) {
      return;
    }

    // 获取目标的 top left
    const { top: targetTop, left: targetLeft, bottom: targetBottom } = document.querySelector('#item')!.getBoundingClientRect();
    // 获取图片的 top left
    const { top: imageTop, bottom: imageBottom } = document.querySelector('#image')!.getBoundingClientRect();

    // 获取所有物料的 rect 数据
    const deltaList = initMaterialStyles.map(style => {
      const rect = document.querySelector(`[data-material-id="${style.id}"]`)!.getBoundingClientRect();
      return {
        style,
        deltaX: targetLeft - rect.left - rect.width / 2,
        deltaY: targetTop - rect.top - rect.height / 2,
      }
    })

    // 计算物料的消失位置
    const newMaterialStyles = deltaList.map<MaterialStyles>((delta) => {
      return {
        ...delta.style,
        opacity: 0,
        transform: `translate(${delta.deltaX}px, ${delta.deltaY}px)`,
      }
    })
    setMaterialStyles(newMaterialStyles);

    // 计算图片的消失位置
    const middle = (imageTop + imageBottom) / 2;
    const imageYOrigin = getImageYOrigin(targetTop, targetBottom, middle);
    setImageStyle({
      transformOrigin: `left ${imageYOrigin}`,
      opacity: 0,
      transform: `translate(-50%, -50%) scale(0.6)`,
    })

    // 让浮动内容消失
    const disappearInterval = newMaterialStyles.length * 200; // n * 200 ms
    setTimeout(() => {
      setDisappear(true)
    }, disappearInterval)
  }

  return (
    <div>
      <div
        id="image"
        style={imageStyle}
        className={classNames(styles.image, {[styles.disappear]: disappear })}>
        图片
        <button onClick={onClose}>取消</button>
      </div>

      {materialStyles.map(({id, ...style}, index) => (
        <div
          data-material-id={id}
          key={id}
          style={{ ...style, transitionDelay: `${index * 100}ms`}}
          className={classNames(styles.material, {[styles.disappear]: disappear})}
        />
      ))}

      <ul className={styles.list}>
        <li>9.99</li>
        <li id="item">24.99</li>
        <li>49.99</li>
      </ul>
    </div>
  )
}

export default CancelModal;
