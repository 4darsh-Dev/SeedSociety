import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ViewTreeModalProps {
  isVisible: boolean;
  treeId: string;
  treeName: string;
  onViewTree: () => void;
  onClose: () => void;
}

export const ViewTreeModal: React.FC<ViewTreeModalProps> = ({
  isVisible,
  treeId,
  treeName,
  onViewTree,
  onClose
}) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      showNotification();
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const showNotification = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => onClose());
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity
        }
      ]}
    >
      <View className="flex-row items-center p-4 bg-white rounded-t-2xl shadow-lg mb-20">
        {/* Success Icon */}
        <View className="bg-green-100 rounded-full p-2 mr-4">
          <MaterialCommunityIcons name="check-circle" size={24} color="#059669" />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-green-600 font-bold text-base mb-1">
            Tree Successfully Geotagged!
          </Text>
          <Text className="text-gray-600 text-sm">
            {treeName} has been added to the map
          </Text>
        </View>

        {/* View Tree Button */}
        <TouchableOpacity
          onPress={onViewTree}
          className="bg-green-500 px-4 py-2 rounded-full ml-2"
        >
          <Text className="text-white text-sm font-medium">View Tree</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  }
});
