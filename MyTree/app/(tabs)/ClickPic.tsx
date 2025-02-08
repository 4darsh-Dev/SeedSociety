import CameraScreen from '@/components/ui/CameraScreen'
import { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import * as Location from 'expo-location';

//for passing prop
interface CameraScreenProps {
  getCurrentLocation: () => Promise<void>;
}

const ClickPic:React.FC<CameraScreenProps>=()=> {
     //Location setup
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  async function getCurrentLocation() {
      
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation,});
    setLocation(location);
    console.log(location)
  }

  return (
    <View style={styles.container}>
        <CameraScreen getCurrentLocation={getCurrentLocation}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1
  }})
export default ClickPic;