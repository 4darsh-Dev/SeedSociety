import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';

interface TreeCardProps {
  treeName: string;
  location: string;
  plantedDate: string;
  lastWatered: string;
  healthStatus: string;
  points: number;
  imageUrl: string;
  onPress?: () => void;
}

const SmallTreeCard = ({
  treeName,
  location,
  plantedDate,
  lastWatered,
  healthStatus,
  points,
  imageUrl,
  onPress
}: TreeCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-lg shadow-md m-2 overflow-hidden"
    >
      <View className="flex-row">
        {/* Left side - Tree Image */}
        <View className="w-1/3 h-40">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full rounded-l-lg"
            resizeMode="cover"
          />
        </View>

        {/* Right side - Tree Information */}
        <View className="w-2/3 p-4">
          <Text className="text-xl font-bold text-gray-800 mb-2">
            {treeName}
          </Text>

          <View className="space-y-2">
            {/* Location */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons 
                name="map-marker" 
                size={16} 
                color="#059669" 
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-600 text-sm">{location}</Text>
            </View>

            {/* Planted Date */}
            <View className="flex-row items-center">
              <FontAwesome5 
                name="tree" 
                size={14} 
                color="#059669" 
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-600 text-sm">Planted: {plantedDate}</Text>
            </View>

            {/* Last Watered */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons 
                name="water-outline" 
                size={16} 
                color="#3B82F6" 
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-600 text-sm">Last watered: {lastWatered}</Text>
            </View>

            {/* Points */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons 
                name="star-outline" 
                size={16} 
                color="#F59E0B" 
                style={{ marginRight: 8 }}
              />
              <Text className="text-gray-600 text-sm">{points} points earned</Text>
            </View>

            {/* Health Status Badge */}
            <View className="absolute top-2 right-2">
              <View className={`px-2 py-1 rounded-full ${
                healthStatus === 'Healthy' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <Text className={`text-xs ${
                  healthStatus === 'Healthy' ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {healthStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SmallTreeCard;