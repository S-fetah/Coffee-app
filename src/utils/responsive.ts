import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const scale = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH / BASE_WIDTH) * size);
};
export const verticalScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / BASE_HEIGHT) * size);
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);
};

/**
 * Dynamic Hook variant: Automatically recalculates if the device
 * rotates or enters Android split-screen multitasking.
 */
import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    s: (size: number) =>
      PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size),
    vs: (size: number) =>
      PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size),
    ms: (size: number, factor = 0.5) =>
      PixelRatio.roundToNearestPixel(
        size + ((width / BASE_WIDTH) * size - size) * factor,
      ),
  };
};
