import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Animated } from 'react-native';
import * as Font from 'expo-font';
import LottieView from "lottie-react-native";
import animation from "../../Contree_Start_Animation.json";

export default function AnimationWithImperativeApi() {
  const animationRef = useRef<LottieView>(null); 
  const [textOpacity] = useState(new Animated.Value(0));
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityText1 = useRef(new Animated.Value(1)).current;
  const opacityText2 = useRef(new Animated.Value(0)).current;
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
    textOpacity.setValue(0);
    rotateAnim.setValue(0);
    opacityText1.setValue(1);
    opacityText2.setValue(0);
    setShowText2(false);
    animationRef.current?.play(0, 38);
  }, []);

  const handleAnimationFinish = () => {
    console.log('Animation Finished');
    // Animate the opacity of the text to 1
    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityText1, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityText2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowText2(true);
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
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
      <Animated.Text style={[styles.textLarge, { opacity: textOpacity }]}>
        CONTREE
      </Animated.Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Animated.Text style={[styles.textSmall, { opacity: textOpacity }]}>
          Contribution {''}
        </Animated.Text>
        {!showText2 && (
          <Animated.Text
            style={[
              styles.textSmall,
              {
                opacity: opacityText1,
                transform: [{ rotateX: rotateInterpolate }],
              },
            ]}
          >
            toward Trees
          </Animated.Text>
        )}
        {showText2 && (
          <Animated.Text
            style={[
              styles.textSmall,
              {
                opacity: opacityText2,
                backgroundColor: '#147530',
                color: 'white',
                paddingHorizontal: 5,
              },
            ]}
          >
            for Yourself
          </Animated.Text>
        )}
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