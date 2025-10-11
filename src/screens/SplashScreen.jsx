import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Platform,
  PixelRatio,
} from 'react-native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />
      <Animated.Image
        source={require('../assets/original.png')}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        Recipes
      </Animated.Text>

      <Animated.Text
        style={[
          styles.slogan,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        Discover. Create. Taste.
      </Animated.Text>
      <ActivityIndicator style={styles.loading} size="small" color="#fff" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: PixelRatio.getPixelSizeForLayoutSize(40),
    height: PixelRatio.getPixelSizeForLayoutSize(40),
    borderRadius: 24,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1.2,
  },
  slogan: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 4,
  },
  loading: {
    marginTop: 40,
  },
});
