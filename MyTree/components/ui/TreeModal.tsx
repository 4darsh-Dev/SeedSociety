// TreeCardModal.tsx
import React from 'react';
import { View, Animated, Dimensions, StyleSheet, PanResponder } from 'react-native';
import TreeCard from './TreeCard';

interface TreeCardModalProps {
  isVisible: boolean;
  tree: any | null;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_HEIGHT = 500; // Adjust based on your TreeCard height

const TreeCardModal = ({ isVisible, tree, onClose }: TreeCardModalProps) => {
  // Animation value for the modal position
  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  
  // Pan responder for swipe-down to close
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) { // Only allow downward swipe
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) { // Threshold to close
          closeModal();
        } else {
          // Reset to open position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Show modal animation
  const showModal = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  // Hide modal animation
  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  // Effect to handle visibility changes
  React.useEffect(() => {
    if (isVisible) {
      showModal();
    }
  }, [isVisible]);

  if (!isVisible || !tree) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Drag Handle */}
        {/* <View style={styles.dragHandle} /> */}
        
        {/* Tree Card */}
        <TreeCard
          treeName={tree.treeName || "Seed Society's Tree"}
          location={tree.location}
          plantedDate={tree.plantedAt}
          healthStatus={tree.healthStatus}
          images={tree.images}
          species={tree.species}
          planter={tree.planter}
          notes={tree.notes}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 4,
    marginBottom:70,
    maxHeight: CARD_HEIGHT,
    marginHorizontal:20
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default TreeCardModal;