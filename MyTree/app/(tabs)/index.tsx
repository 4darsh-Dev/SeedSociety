import { useRoute } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Index() {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <Text>Posts</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0b6a06',
    padding: 15,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#0b6a06',
    opacity: 0.7, // Adjust the opacity to achieve the fade effect
  },
  buttonText: {
    color: 'white',
  },
})
