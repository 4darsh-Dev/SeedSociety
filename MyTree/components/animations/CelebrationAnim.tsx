import LottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { View,Text } from 'react-native'
interface Props {
  status: boolean | null
}
const CelebrationAnim:React.FC<Props> = ({status}) => {
  const [animationData,setAnimationData] = useState<any>(null)
  useEffect(() => {
    if(!status) return
    const data = async ()=> {
      try{
        const anim = await fetch('https://lottie.host/4e627fa9-e251-46cf-9062-9c7be66f00c4/eGDvRafnQi.json')
        if(anim) {
          const animJson = await anim.json()
          setAnimationData(animJson)
        }
      }catch(err) {
        console.log(err)
    }}
    data()
  },[status])
  if (!animationData) {
    return null
  }
  return <>{status &&  <View className='z-[1002] absolute top-0 left-0 h-[100vw] flex items-center justify-center w-[100vw]'>
    <LottieView 
    source={animationData}
    style={{ width: 800, height: 600 }}
    autoPlay
    />
    </View>
    }
    </>
}

export default CelebrationAnim
