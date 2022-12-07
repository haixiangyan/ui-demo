import {CSSProperties, FC, useState} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

export interface Material {
  id: string;
  src: string;
  style: {
    top: CSSProperties['top'];
    left: CSSProperties['left'];
    width: number;
    height: number;
    transform?: CSSProperties['transform'];
  }
}

interface Props {
  visible: boolean;
  background: string;
  initMaterialList: Material[];
  onClose: () => void;
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
  const { visible, initMaterialList, background, onClose } = props;

  const [imageStyle, setImageStyle] = useState<CSSProperties>({});
  const [materialList, setMaterialList] = useState<Material[]>(initMaterialList);

  const goPurchase = () => {
    if (!visible) {
      return;
    }

    // 获取目标的 top left
    const { top: targetTop, left: targetLeft, bottom: targetBottom } = document.querySelector('#item')!.getBoundingClientRect();
    // 获取图片的 top left
    const { top: imageTop, bottom: imageBottom } = document.querySelector('#image')!.getBoundingClientRect();

    // 获取所有物料的 rect 数据
    const deltaList = initMaterialList.map(material => {
      const rect = document.querySelector(`[data-material-id="${material.id}"]`)!.getBoundingClientRect();
      return {
        material,
        deltaX: targetLeft - rect.left - rect.width / 2,
        deltaY: targetTop - rect.top - rect.height / 2,
      }
    })

    const resetStyles = () => {
      setImageStyle({});
      setMaterialList(initMaterialList);
    }

    // 计算物料的消失位置
    const newMaterialList: Material[] = deltaList.map<Material>((delta) => {
      return {
        ...delta.material,
        style: {
          ...delta.material.style,
          opacity: 0,
          transform: `translate(${delta.deltaX}px, ${delta.deltaY}px)`,
        }
      }
    })
    setMaterialList(newMaterialList);

    // 计算图片的消失位置
    const middle = (imageTop + imageBottom) / 2;
    const imageYOrigin = getImageYOrigin(targetTop, targetBottom, middle);
    setImageStyle({
      transformOrigin: `left ${imageYOrigin}`,
      opacity: 0,
      transform: `scale(0.6)`,
    })

    // 让浮动内容消失
    const disappearInterval = newMaterialList.length * 200; // n * 200 ms
    setTimeout(() => {
      resetStyles();
      onClose();
    }, disappearInterval)
  }

  return (
    <div>
      {/* Modal */}
      <div className={classNames(styles.modal, {[styles.visible]: visible})}>
        {/*背景图红包*/}
        <img id="image" style={imageStyle} className={styles.image} src={background} alt="红包"/>

        {/*金币*/}
        {materialList.map((material, index) => (
          <img
            data-material-id={material.id}
            src={material.src}
            key={material.id}
            style={{ ...material.style, transitionDelay: `${index * 100}ms`}}
            className={styles.material}
            alt="Coin"
          />
        ))}

        {/*购买取消*/}
        <button className={styles.button} onClick={goPurchase}>取消</button>
      </div>
    </div>
  )
}

export default CancelModal;
