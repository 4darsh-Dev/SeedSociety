import React from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import profilePic from '@/assets/images/profile-img.png'
import growingPlant from '@/assets/images/growing-plant.png'
import bronzeBadge from '@/assets/images/bronze-badge.png'
import ImageFrame from '@/components/vectors/ImageFrame'
import BgLine from '../vectors/BgLine'
import StatsCard from './StatsCard'
import { Kanit_600SemiBold, useFonts } from '@expo-google-fonts/kanit'

const Dashboard = () => {
  const [loaded, error] = useFonts({
    Kanit_600SemiBold,
  });
  const HEADER_HEIGHT = 200; // Adjust this value based on your needs
  const windowHeight = Dimensions.get('window').height;
  const user = {
    name: 'Aman Singh',
    level: 'Proficient',
    profileImage: profilePic,
    treesPlanted: 25,
    treesNurtured: 100
  }

  const cardData = [1, 2, 3, 4] // Dummy data for scrollable cards
  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container} className='flex-1 bg-[#f0f0f0]'>
      {/* Fixed Top Section */}
      <View
        style={styles.profileContainer}
        className='rounded-bl-[30px] rounded-br-[30px] absolute top-0 left-0 right-0 bg-[#0A5122]'
      >
        <View className='flex-1'>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons
                name='location-outline'
                size={24}
                color='#cccccc'
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.profileText} >Your Profile</Text>
            <TouchableOpacity className=''>
              <Image
                source={profilePic}
                className='h-10 w-10 rounded-3xl'
                style={{ resizeMode: 'stretch' }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.profileSection, { zIndex: 1000 }]}
            className='z-[1001]'
          >
            {/* <View className='flex items-center font-bold' >
        <ImageFrame image={profilePic} size={120}/>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userLevel}>{user.level}</Text>
        </View>
        </View> */}
            <View>
              <Image
                source={bronzeBadge}
                style={{ height: 200, width: 200, resizeMode: 'stretch' }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Stats Card */}
      {/* <View
        className='flex flex-col items-start justify-around bg-white mx-10 mt-[-25] rounded-2xl px-6 py-3 gap-3'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 4
        }}
      >
        <Text className='text-center text-2xl font-bold text-black'>Stats</Text>
        <View className='flex flex-row gap-20 items-start'>
            <View className='border border-[#078A04] flex flex-row p-5 gap-[15vw] rounded-2xl'>
            <Image
              source={treeWateringIcon}
              style={{ height: 40, width: 40, resizeMode: 'stretch' }}
            />
            <Image
              source={treePlanted}
              style={{ height: 40, width: 40, resizeMode: 'stretch' }}
            />
            <Image
              source={co2AbsorbedIcon}
              style={{ height: 40, width: 40, resizeMode: 'stretch' }}
            />
            <Image
              source={o2ReleasedIcon}
              style={{ height: 30, width: 30, resizeMode: 'stretch' }}
            />
          </View>
          <View className='flex items-center'>
            <Text className='text-[6rem]'>25</Text>
            <Text className='text-xl text-[#868585] font-semibold'>
              TREES PLANTED
            </Text>
          </View>
        </View>
      </View> */}
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
      {/* <View className='absolute top-60 left-10 z-[900]'></View>
      <View
        className='absolute left-0 z-[900]'
        style={{ top: 70, zIndex: 900 }}
      >
        <BgLine />
      </View>
      <View
        className='absolute left-0 z-[900]'
        style={{ top: 200, zIndex: 900 }}
      >
        <BgLine />
      </View> */}
    </View>
  )
}
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  profileContainer: {
    height: screenHeight * 0.45,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
    // zIndex: 10
  },
  profileText: {
    color: '#d6d6d6',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'Kanit_600SemiBold'
  },
  icon: {
    padding: 8
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    // paddingTop: 60,
    // paddingBottom: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 30,
    // height: screenHeight * 0.5,
    borderRadius: 50
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white'
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  userLevel: {
    color: 'white',
    fontSize: 14
  },
  statBox: {
    // flex: 1,
    // alignItems: "center",
    width: 100
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 10,
    color: 'gray'
  },
  cardContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  card: {
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10
  },
  cardNew: {
    display: 'flex',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 25,
    marginVertical: 15
  }
})

export default Dashboard
