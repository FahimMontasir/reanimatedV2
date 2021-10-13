import React, {useCallback, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const App = () => {
  const doubleTapRed = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });
  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(1000, withSpring(0));
      }
    });
  }, [scale]);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, [opacity]);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRed} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRed}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              style={styles.img}
              source={require('./assets/images/bg_love.jpg')}>
              <AnimatedImage
                style={[styles.img, rStyle]}
                source={require('./assets/images/like.png')}
                resizeMode="center"
              />
            </ImageBackground>
            <Animated.Text
              style={[{textAlign: 'center', fontSize: 35}, rTextStyle]}>
              hello world
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};
export default App;

const {width: Size} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Size,
    height: Size,
  },
});
