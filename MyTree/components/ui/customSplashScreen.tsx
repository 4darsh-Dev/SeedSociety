import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import animation from "../../Contree_Start_Animation.json";

export default function CustomSplashScreen() {
  const animationRef = useRef<LottieView>(null);
  const [textOpacity] = useState(new Animated.Value(0));
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    }

    textOpacity.setValue(0);
    animationRef.current?.play(0, 38);
    loadFonts();
    prepare();
  }, []);
  const handleAnimationFinish = () => {
    // Animate the opacity of the text to 1
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={animation}
        style={{ width: 300, height: 300 }}
        loop={false}
        speed={0.4}
        onAnimationFinish={handleAnimationFinish}
      />
      <Animated.Text style={[styles.textLarge, { opacity: textOpacity }]}>
        CONTREE
      </Animated.Text>
      <Animated.Text style={[styles.textSmall, { opacity: textOpacity }]}>
        Contribution toward Trees
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9f3e9', // Adjust the background color as needed
  },
  textLarge: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#147530',
    fontFamily: 'Poppins-ExtraBold',
  },
  textSmall: {
    marginTop: 0,
    fontSize: 15,
    letterSpacing:2,
    fontWeight: 'bold',
    color: '#6ea37d',
    fontFamily: 'sans-serif-condensed',
  },
});