import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

const ScrollAnimationExample = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerText}>Header</Text>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} style={styles.item}>
            <Text>Item {index + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 100,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ScrollAnimationExample;