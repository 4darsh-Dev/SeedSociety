import LottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { Kanit_600SemiBold,Kanit_500Medium, useFonts } from '@expo-google-fonts/kanit'
import Entypo from '@expo/vector-icons/Entypo';
interface StatusCardProps {
  status: string | null,
  type: string | null
}
const successAnimUri = 'https://lottie.host/30e192da-bf2a-4b8a-8cc2-d84c32ab2e9d/Bg4XCF2lvU.json'
const loadingAnimUri = 'https://lottie.host/05b4b324-0c9a-4984-b4af-cdde45ef6340/86AO9p1Qgn.json'
const errorAnimUrl = 'https://lottie.host/289587b4-bc31-40a0-9ac5-e7448c6b685c/4Es1Kl9NPb.json'
const loactionAnim = 'https://lottie.host/717f0e81-17db-4814-91bc-ba0a5ad0d807/U4yC7DWR1v.json'
const StatusCard:React.FC<StatusCardProps> = ({status, type}) => {
  const [loaded, error] = useFonts({
    Kanit_600SemiBold,
    Kanit_500Medium
  });
  const [animationData,setAnimationData] = useState<any>(null)
  useEffect(() => {
    if(!status) return
    const data = async ()=> {
      try{
        const anim = await fetch(type === 'success' ? successAnimUri : type === 'loading' ? loadingAnimUri : type === 'error' ? errorAnimUrl : loactionAnim)
        if(anim) {
          const animJson = await anim.json()
          setAnimationData(animJson)
        }
      }catch(err) {
        console.log(err)
    }}
    data()
  },[status, type])
  if (!loaded && !error) {
    return null;
  }
  if (!animationData) {
    return null
  }
  return <>{status && <View className='z-[1000] absolute top-0 left-0 h-[100vw] flex items-center justify-center w-[100vw]'>
  <View className='z-[1001] bg-white top-[30vh] left-0 right-0 mx-5 rounded-xl flex items-center justify-center h-[36vh] w-[80vw]' style={{
    shadowColor: '#7e7c7c',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }}>
    <LottieView 
    source={animationData}
    style={{ width: 200, height: 200 }}
    autoPlay
    />
    <Text className='text-2xl mb-10 text-center' style={{
      fontFamily: 'Kanit_500Medium',
    }}>{status}</Text>
    <TouchableOpacity className='z-[1001] absolute top-0 right-0 m-5' onPress={()=>setAnimationData(null)}>
    <Entypo name="cross" size={24} color="#c8c3c3" />
    </TouchableOpacity>
    </View>
    <View className="absolute inset-0 bg-black/50 z-50 h-[100vh] top-0" />
    </View>}</>
}

export default StatusCard
