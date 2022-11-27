export const isInRange = (boundingRect: DOMRect) => {
  const { top, bottom, left, right } = boundingRect;

  // 垂直中间距离
  const midHeight = window.innerHeight / 2;

  const isVerticalInRange = top <= midHeight && midHeight <= bottom;
  const isHorizontalInRange = 0 <= left && right <= window.innerWidth;

  return {
    vertical: isVerticalInRange,
    horizontal: isHorizontalInRange,
    result: isVerticalInRange && isHorizontalInRange,
  }
}
