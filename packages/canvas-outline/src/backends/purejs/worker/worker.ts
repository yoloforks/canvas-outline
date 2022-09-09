import { canvasIterator } from './canvasIterator'

function convertColor(hex: string): {
  r: number, g: number, b: number
} {
  return {
    r: +('0x' + hex[1] + hex[2]),
    g: +('0x' + hex[3] + hex[4]),
    b: +('0x' + hex[5] + hex[6])
  }
}

onmessage = ({ data }) => {
  const {
    imageData,
    overlapTopData,
    overlapBottomData,
    width,
    strokeWidth,
    strokeColor
  } = data;

  const rgb = convertColor(strokeColor);

  let clampedArray = new Uint8ClampedArray(Array.from(imageData));
  const d = Array.from(imageData) as number[];
  const overlapTop = Array.from(overlapTopData) as number[];
  const overlapBot = Array.from(overlapBottomData) as number[];
  

  for (let {index} of canvasIterator(d, overlapTop, overlapBot, width, strokeWidth)) {
    clampedArray[index] = rgb.r;
    clampedArray[index + 1] = rgb.g;
    clampedArray[index + 2] = rgb.b;
    clampedArray[index + 3] = 255;
  }

  postMessage({clampedArray: clampedArray});
};