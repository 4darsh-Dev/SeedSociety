// StatsCard.js
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts,Kanit_600SemiBold  } from "@expo-google-fonts/kanit";
import treeWateringIcon from '@/assets/images/tree-watering-icon.png'
import treePlanted from '@/assets/images/tree-planted.png'
import co2AbsorbedIcon from '@/assets/images/co2-absorbed-icon.png'
import o2ReleasedIcon from '@/assets/images/o2-released-icon.png'

const StatsCard = () => {
  const [activeTab, setActiveTab] = useState('trees');
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Kanit_600SemiBold
  });
  interface TabsInterface{
    id: string,
    image: ImageSourcePropType | undefined,
    value: number,
    unit?: string,
    label: string,
    size:number
  }
  const tabs:Array<TabsInterface>= [
    {
      id: 'trees',
      image: treePlanted,
      value: 25,
      label: 'TREES PLANTED',
      size: 40
    },
    {
      id: 'awards',
      image: treeWateringIcon,
      value: 12,
      label: 'TREES NURTURED',
      size: 40
    },
    {
      id: 'cycles',
      image: co2AbsorbedIcon,
      value: 20,
      label: 'CO2 ABSORBED',
      size: 40,
      unit: 'kg'
    },
    {
      id: 'achievements',
      image: o2ReleasedIcon,
      value: 15,
      label: 'O2 RELEASED',
      size: 30
    }
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.container}>
        {/* Tab Icons */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTab
              ]}
            >
              {/* <MaterialCommunityIcons
                name={tab.icon}
                size={24}
                color={activeTab === tab.id ? '#000' : '#666'}
              /> */}
              <Image source={tab.image} style={{ height: tab.size, width: tab.size, resizeMode: 'stretch' }} />
            </Pressable>
          ))}
        </View>

        {/* Stats Display */}
        <View style={styles.statsContainer}>
          <View className='flex flex-row items-center'>
          <Text style={styles.statsValue}>
            {tabs.find(tab => tab.id === activeTab)?.value}
          </Text>
          <Text style={styles.statsLabel}>
            {tabs.find(tab => tab.id === activeTab)?.unit}
            </Text>
          </View>
          <Text style={styles.statsLabel}>
            {tabs.find(tab => tab.id === activeTab)?.label}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    gap:10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  tabButton: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#E0E0E0',
  },
  statsContainer: {
    alignItems: 'center',
    flex: 1,
    marginLeft: 24,
  },
  statsValue: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'serif',
  },
  statsLabel: {
    fontSize: 20,
    color: '#666666',
    marginTop: 4,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold'
  }
});

export default StatsCard;