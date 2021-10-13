import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('window');

const SIZE = width * 0.7;

const Page = ({title, index, translateX}: IProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const border = interpolate(
      translateX.value,
      inputRange,
      [0, width / 3, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius: border,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.texContainer, rTextStyle]}>
        <Animated.Text style={styles.text}>{title}</Animated.Text>
      </Animated.View>
    </View>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.6)',
  },
  texContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 70,
    color: 'white',
    fontWeight: '800',
  },
});
