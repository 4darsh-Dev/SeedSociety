import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType, Dimensions, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ImageType = {
  id: number;
  treeId: number;
  imageUrl: string | undefined;
  uploadedAt: any;
};

interface ImageSliderProps {
  images: ImageType[];
  height?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, height = 200 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = React.useRef<ScrollView>(null);
  useEffect(() => {
    console.log('images',images)
  },[images])
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const newIndex = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(newIndex);
  };

  const scrollToImage = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true
      });
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      scrollToImage(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      scrollToImage(activeIndex + 1);
    }
  };
  if(!images) return null
  return (
    <View className="relative">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={image.id} style={{ width: screenWidth }}>
            <Image
             source={{uri:image.imageUrl}}
              className="w-full"
              style={{ height }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Navigation Arrows */}
      {activeIndex > 0 && (
        <TouchableOpacity
          onPress={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2"
          style={{ transform: [{ translateY: -15 }] }}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      )}

      {activeIndex < images.length - 1 && (
        <TouchableOpacity
          onPress={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2"
          style={{ transform: [{ translateY: -15 }] }}
        >
          <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      )}

      {/* Pagination Dots */}
      <View className="absolute bottom-2 flex-row justify-center w-full space-x-2">
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToImage(index)}
            className={`h-2 rounded-full ${
              index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </View>
    </View>
  );
};