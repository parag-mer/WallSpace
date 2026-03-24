import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const ZoomableImage = ({ uri }: { uri: string }) => {
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 4);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (scale.value > 1) {
        const maxX = (width * scale.value - width) / 2;
        const maxY = (height * scale.value - height) / 2;

        translateX.value = Math.min(
          Math.max(savedTranslateX.value + e.translationX, -maxX),
          maxX,
        );
        translateY.value = Math.min(
          Math.max(savedTranslateY.value + e.translationY, -maxY),
          maxY,
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(e => {
      if (scale.value > 1) {
        //reset
        scale.value = withTiming(1);
        savedScale.value = 1;

        translateX.value = withTiming(0);
        translateY.value = withTiming(0);

        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        //zoom in
        scale.value = withTiming(2.5);
        savedScale.value = 2.5;
      }
    });

  const gesture = Gesture.Simultaneous(pinch, pan, doubleTap);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadImage = async () => {
        setLoading(true);

        try {
          await Image.prefetch(uri);
        } catch (e) {
          console.log('Prefetch failed', e);
        }

        if (isActive) {
          setLoading(false);
        }
      };

      loadImage();

      return () => {
        isActive = false;
      };
    }, [uri]),
  );

  return (
    <>
      <GestureDetector gesture={gesture}>
        <AnimatedImage
          key={uri}
          source={{ uri }}
          resizeMode={'contain'}
          style={[{ width, height }, animatedStyle]}
        />
      </GestureDetector>
      {loading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={{
            position: 'absolute',
            top: '50%',
            alignSelf: 'center',
            // zIndex: 10,
          }}
        />
      )}
    </>
  );
};
