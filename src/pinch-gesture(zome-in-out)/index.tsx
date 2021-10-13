import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const PinchGesture = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: e => {
        scale.value = e.scale;
        focalX.value = e.focalX;
        focalY.value = e.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -width / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: width / 2},
      ],
    };
  });

  const rFocalStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View>
        <Animated.Image
          style={[{height, width}, rStyle]}
          source={require('./assets/images/cup.jpg')}
        />
        <Animated.View style={[styles.focalPoint, rFocalStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};
export default PinchGesture;
const styles = StyleSheet.create({
  focalPoint: {
    position: 'absolute',
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
