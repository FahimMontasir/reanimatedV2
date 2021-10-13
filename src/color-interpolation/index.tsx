import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const SWITCH_TRUCK_COLOR = {
  true: 'tomato',
  false: 'black',
};

const COLORS = {
  dark: {
    background: 'black',
    circle: 'gray',
  },
  light: {
    background: 'white',
  },
};

type Theme = 'light' | 'dark';

const ColorInterpolation = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.background, COLORS.dark.background],
    );
    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.background, COLORS.dark.circle],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggle => setTheme(toggle ? 'dark' : 'light')}
          trackColor={SWITCH_TRUCK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
};
export default ColorInterpolation;

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    elevation: 10,
  },
});
