import React from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import { Kanit_600SemiBold, useFonts } from '@expo-google-fonts/kanit'
const ProfileEx = () => {
  const [loaded, error] = useFonts({
    Kanit_600SemiBold,
  });
  const HEADER_HEIGHT = 200; // Adjust this value based on your needs
  const windowHeight = Dimensions.get('window').height;
  if (!loaded && !error) {
    return null;
  }
  return (
    <View className="flex-1 bg-gray-100">
      {/* Fixed Header Section */}
      <View 
        className="absolute top-0 left-0 right-0 z-10 bg-white"
        style={{ height: HEADER_HEIGHT }}
      >
        <View className="flex-1 p-4">
          <View className="flex-row items-center space-x-4 font-[Kanit_600SemiBold]">
            <View className="w-20 h-20 rounded-full bg-gray-300" />
            <View>
              <Text className="text-xl font-bold">John Doe</Text>
              <Text className="text-gray-600">@johndoe</Text>
            </View>
          </View>
          <View className="flex-row justify-around mt-4">
            <View className="items-center">
              <Text className="font-bold">523</Text>
              <Text className="text-gray-600">Following</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">1.4K</Text>
              <Text className="text-gray-600">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">88</Text>
              <Text className="text-gray-600">Posts</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 z-[1000] mb-10"
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT, // Initial padding to prevent content from being hidden
          minHeight: windowHeight
        }}
      >
        {/* Sample Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View
            key={item}
            className="bg-white rounded-lg shadow m-4 p-4"
          >
            <Text className="text-lg font-semibold mb-2">Card {item}</Text>
            <Text className="text-gray-600">
              This is a sample card content. You can replace this with your actual
              card components.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ProfileEx;