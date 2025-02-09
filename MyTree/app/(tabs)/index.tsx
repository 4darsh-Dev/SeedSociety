import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActionCard } from '@/components/ui/ActionCard';
import { useRouter } from 'expo-router';

const ActionPage: React.FC = () => {
  const navigation = useRouter();
  const actions = [
    {
      id: 1,
      title: 'GeoTag a Tree',
      description: 'Help map and monitor trees in your community by adding them to our global database.',
      icon: 'location-pin',
      backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPeW4zGA7M8Wq15GK175fayDtoeX5Jq_Xd1g&s', 
      onPress: () => navigation.navigate('/(tabs)/ClickPic')
    },
    {
      id: 2,
      title: 'Plant a Tree',
      description: 'Join our mission to grow urban forests. Track and nurture your planted trees.',
      icon: 'tree',
      backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmDEZR9L0Ut7oA3K36w77iqUFkWZIu_vPVA&s', 
      onPress: () => navigation.navigate('/(tabs)/ClickPic')
    },
    {
      id: 3,
      title: 'Detect Disease',
      description: 'Use AI-powered detection to identify and treat tree diseases early.',
      icon: 'circle-with-plus',
      backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYcLZbEA9QsPHX2E9ec5Q5P8yCUPrOY1w4g&s', 
      onPress: () => navigation.navigate('/(tabs)/ClickPic')
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 mb-10">
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Take Action
          </Text>
          <Text className="text-gray-600 text-base">
            Make a difference in your community by helping us protect and grow our urban forest.
          </Text>
        </View>
        {/* Action Cards */}
        {actions.map(action => (
          <ActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            backgroundImage={action.backgroundImage}
            onPress={action.onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

// Screen Component
const Index: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-50 safe-top">
      <ActionPage />
    </View>
  );
};

export default Index;