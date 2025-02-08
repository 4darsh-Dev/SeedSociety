import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import noImgImage from '@/assets/images/no-image.jpg';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ImageSlider } from './ImageSlider';
interface TreeCardProps {
  treeName: string;
  location: string;
  plantedDate: string;
  healthStatus: string;
  species: string;
  images: ImageType[] | null;
  onPress?: () => void;
  planter:{
    id:number;
    name:string;
    email:string;
  },
  notes:string | null
}
type ImageType = {
  id:number;
  treeId:number;
  imageUrl:string | undefined;
  uploadedAt:any
}
const TreeCard = ({
  treeName,
  location,
  plantedDate,
  healthStatus = 'Healthy',
  images,
  onPress, species,planter,notes
}: TreeCardProps) => {
  return (
    <View className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Top Image Section */}
      <View className="w-full h-48">
        {/* {imageUrl ? <Image
          source={{ uri: imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
        /> : <Image
        source={noImgImage}
        className="w-full h-full"
        resizeMode="cover"/>} */}
        {images && images?.length !== 0 ? 
        <ImageSlider images={images} height={200} />: <Image
        source={noImgImage}
        className="w-full h-full"
        resizeMode="cover"/>}
        {/* Health Status Badge */}
        <View className="absolute top-2 right-2 flex flex-row items-center gap-2">
          <View className={`px-2 py-1 rounded-full ${
            healthStatus === 'Healthy' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <Text className={`text-xs ${
              healthStatus === 'Healthy' ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {healthStatus}
            </Text>
          </View>
         { species && <View className={`px-2 py-1 rounded-full  bg-purple-200`}>
            <Text className={`text-xs text-purple-800`}>
              {species}
            </Text>
          </View>}
        </View>
        <View className='absolute bottom-[-12] right-5 rounded-full bg-green-500'>
        <Entypo name="plus" size={30} color="white" />
        </View>
      </View>

      {/* Details Section */}
      <View className="p-4 flex items-start">
        {/* Tree Name */}
        <Text className="text-xl font-bold text-gray-800 mb-3">
          {treeName}
        </Text>

        {/* Info Grid */}
        <View className="space-y-2">
          {/* Location */}
          <View className="flex-row items-center">
            <Entypo name="location-pin" size={16} color="#f82777" 
              className='mr-2' />
            <Text className="text-gray-600 text-sm pr-2">{location}</Text>
          </View>

          {/* Planted Date */}
          <View className="flex-row items-center">
          <Entypo name="user" size={16} color="black" className='mr-2'/>
            <Text className="text-gray-600 text-sm">Planted by: {planter.name}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons 
              name="clock" 
              size={14} 
              color="#059669" 
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-600 text-sm">Planted at: {plantedDate.slice(0,10)}</Text>
          </View>
          <View className="flex-row items-center">
          <Entypo name="pencil" size={16} color="#c4d61f" 
              style={{ marginRight: 8 }}/>
            <Text className="text-gray-600 text-sm">{notes}</Text>
          </View>
          </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-4 gap-2">
          <TouchableOpacity 
            onPress={onPress}
            className="bg-green-500 px-4 py-2 rounded-full flex-row items-center"
          >
            <MaterialCommunityIcons 
              name="water" 
              size={16} 
              color="white" 
              style={{ marginRight: 4 }}
            />
            <Text className="text-white text-sm">Water Tree</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={onPress}
            className="bg-blue-500 px-4 py-2 rounded-full flex-row items-center"
          >
            <MaterialCommunityIcons 
              name="information" 
              size={16} 
              color="white" 
              style={{ marginRight: 4 }}
            />
            <Text className="text-white text-sm">Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TreeCard;