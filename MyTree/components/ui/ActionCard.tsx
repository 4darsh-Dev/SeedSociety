import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  backgroundImage: any;
  onPress: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  backgroundImage,
  onPress
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="mb-4 rounded-2xl overflow-hidden shadow-lg"
    style={{ elevation: 4 }}
  >
    <ImageBackground
      source={{uri:backgroundImage}}
      className="w-full"
      imageStyle={{ opacity: 0.8 }}
    >
      <View className="bg-black/30 p-6">
        <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center mb-4">
          <Entypo name={icon} size={28} color="white" />
        </View>
        
        <Text className="text-white text-2xl font-bold mb-2">
          {title}
        </Text>
        
        <Text className="text-white/90 text-base mb-2">
          {description}
        </Text>

        <View className="flex-row items-center">
          <Text className="text-white font-medium mr-2">Get Started</Text>
          <Entypo name="arrow-right" size={20} color="white" />
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);