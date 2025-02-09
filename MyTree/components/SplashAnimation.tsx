import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, runOnJS } from 'react-native-reanimated';
import * as Font from 'expo-font';
import LottieView from "lottie-react-native";
import animation from "../Contree_Start_Animation.json";
import SignInBtn from '@/components/ui/SignInBtn';
import SignInNewBtn from '@/components/ui/SignInNewBtn';

export default function SplashAnimation() {
  const animationRef = useRef<LottieView>(null); 
  const textOpacity = useSharedValue(0);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const rotateAnim1 = useSharedValue(0);
  const rotateAnim2 = useSharedValue(1);
  const visibilityAnim = useSharedValue(0);
  const opacityText1 = useSharedValue(0);
  const opacityText2 = useSharedValue(0);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
    textOpacity.value = 0;
    rotateAnim1.value = 0;
    opacityText1.value = 0;
    opacityText2.value = 0;
  visibilityAnim.value = 0;
    console.log('Animation Loaded');
    animationRef.current?.play(0, 38);
    console.log('Animation Played');
  }, []);
  // const toggleTextVisibility = () => {
  //   setShowText2((prev) => !prev);
  // }
  const handleAnimationFinish = () => {
    console.log('Animation Finished');
    // Animate the opacity of the text to 1
    textOpacity.value = withTiming(1, { duration: 1000 });
opacityText1.value = withTiming(1, { duration: 1000 });

// Animate the rotation of text1 to 180 degrees after a 1-second delay
rotateAnim1.value = withSequence(
  withTiming(0, { duration: 0 }), // Ensure it starts from 0
  withTiming(0, { duration: 1000 }), // Delay of 1 second
  withTiming(1, { duration: 1000 }) // Rotate to 180 degrees
);

// Run the second set of animations after the first sequence
opacityText1.value = withSequence(
  withTiming(1, { duration: 2000 }), // Wait for the first sequence to complete
  withTiming(0, { duration: 1000 }) // Animate opacityText1 to 0
);

opacityText2.value = withSequence(
  withTiming(1, { duration: 2000 }), // Wait for the first sequence to complete
  withTiming(1, { duration: 1000 }) // Animate opacityText2 to 1
);

visibilityAnim.value = withSequence(
  withTiming(1, { duration: 2000 }), // Wait for the first sequence to complete
  withTiming(1, { duration: 1000 }) // Animate visibilityAnim to 1
);
  };

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const animatedText1Style = useAnimatedStyle(() => {
    return {
      opacity: opacityText1.value,
      transform: [{ rotateX: `${rotateAnim1.value * 180}deg` }],
    };
  });
  const animatedText2Style = useAnimatedStyle(() => {
    return {
      opacity: opacityText2.value,
      transform: [{ rotateX: `${rotateAnim2.value * 180}deg` }],
    };
  });

  if (!fontsLoaded) {
    return null; 
  }

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
      <Animated.Text style={[styles.textLarge,animatedTextStyle]}>
        CONTRE
      </Animated.Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Animated.Text style={[styles.textSmall, { opacity: textOpacity }]}>
          Contribution {''}
        </Animated.Text>
        {visibilityAnim.value===0  && (
          <Animated.Text
            style={[
              styles.textSmall,
              animatedText1Style
            ]}
          >
            toward Trees
          </Animated.Text>
        )}
        {visibilityAnim.value ===1 && (
          <Animated.Text
            style={[
              styles.textSmall,
              {
                backgroundColor: '#147530',
                color: 'white',
                paddingHorizontal: 5,
              },animatedText2Style
            ]}
          >
            for Yourself
          </Animated.Text>
        )}
        <SignInBtn/>
      </View>
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
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#6ea37d',
    fontFamily: 'sans-serif-condensed',
  },
});