import CameraScreen from '@/components/ui/CameraScreen'
import {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image'
import StatusCard from '@/components/ui/StatusCard';
import {detectTrees} from '@/utils/gradioConfig'
import { CameraCapturedPicture } from 'expo-camera';
import CelebrationAnim from '@/components/animations/CelebrationAnim';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'expo-router';
const apiUrl = process.env.EXPO_PUBLIC_API_URL

//for passing prop
interface CameraScreenProps {
  getCurrentLocation: () => Promise<void>;
}
interface Status{
  mssg: string | null,
  type: string | null
}
interface location {
  latitude: number,
  longitude: number
}
interface User{
  id: string,
  name: string,
  email: string,
  trees: any[]
}
const ClickPic:React.FC<CameraScreenProps>=()=> {
    
  const user:User = {
    id: '3d9fd97d-5570-47a5-a3ee-d77731c7bc48',
    name: 'Your lOved one',
    email:'amanforwork1@gmail.com',
    trees:[]
  }
   //Location setup
  const [location, setLocation] = useState<location | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [photo,setPhoto] = useState<CameraCapturedPicture | null>(null);
  const [status,setStatus] = useState<Status | null >(null);
  const [photoUri,setPhotoUri] = useState<string | null>(null);
  const [celebrationAnimStatus,setCelebrationAnimStatus] = useState<boolean>(false);
  const {setSelectedTree} = useAppContext()
  const navigation = useRouter();
  async function getCurrentLocation() {
    //getting location
    setStatus({mssg:'Getting Location',type:'location'})
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation,});
    const {mocked} = location;
    if(mocked){
      alert('Location is mocked')
      setStatus({mssg:'Location is Mocked',type:'error'})
    }else{
      const { coords } = location;
      const { latitude, longitude } = coords;
      if(latitude && longitude){
      setLocation({longitude,latitude});
      setStatus({mssg:'Location Found',type:'success'})
      // setTimeout(()=>setStatus(null),8000)
    }
    }
  }
  const handleSend = async () => {
    //sending tree data to server
   try{ 
    if(location && user && photo && photoUri){
    console.log('Sending tree data to server');
    // setStatus({mssg:'Please try a different Image',type:'error'})
    setStatus({mssg:'Geotagging Your Tree',type:'loading'})
    const formData = new FormData()
    formData.append('planterId', user.id.toString());
    formData.append('latitude', location.latitude.toString());
    formData.append('longitude', location.longitude.toString());
    formData.append('file',{
      uri: photoUri,
      name: photoUri.split('/').pop(), // Ensure a filename is included
      type: "image/jpeg", // Adjust type as needed
  });
    formData.append('species', 'neem');
    formData.append('notes', 'for test');
    console.log('Form Data:', formData);
    const response = await fetch(`${apiUrl}/protected/add-tree`, {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data", 
    },
    })
    const data = await response.json();
    if(response.ok){
      setStatus({mssg:data.mssg,type:'success'})
      setCelebrationAnimStatus(true)
      setTimeout(()=>setCelebrationAnimStatus(false),10000)
      setSelectedTree(data.tree)
      navigation.navigate('/(tabs)/Map')
    }
    else if(response.status === 400){
      setStatus({mssg:data.error,type:'error'})
    }
    else{
      setStatus({mssg:'Something went Wrong, Please Try Again',type:'error'})
    }
  }}
    catch(error){
      console.log(error,'error')
      setStatus({mssg:'Something went Wrong, Please Try Again',type:'error'})
    }
  }
  
  const closeImage = () => {
    //discard image
    setPhoto(null);
  }

  return (
    <View style={styles.container}>
        <CameraScreen getCurrentLocation={getCurrentLocation} setPhotoUri={setPhotoUri} setPhoto={setPhoto} />
        {photo && <View style={styles.image}>
        <TouchableOpacity onPress={closeImage} style={styles.cross}>
        <Entypo name="cross" size={30} color="white"  />
        </TouchableOpacity>
        <Image source={{ uri: photoUri }} style={styles.image}/>
        <TouchableOpacity onPress={handleSend} style={styles.check}>
        <Entypo name="check" size={30} color="white" />
        </TouchableOpacity>
        </View>
        }
       {status &&  <StatusCard status={status.mssg} type={status.type} />}
       {celebrationAnimStatus && <CelebrationAnim status={celebrationAnimStatus}/>}
    </View>
  )
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1
  },
  image: {
    zIndex:999,
    position:'absolute',
    top:0,
    left: 0,
    width: screenWidth,
    height:screenHeight,
    // marginTop: 20,
    alignSelf: 'center',
  },
  cross:{
    position:'absolute',
    top:0,
    right: 0,
    color:'white',
    margin:10,
    zIndex:1000,
    backgroundColor:'#00000070',
    borderRadius:50,
  },
  check:{
    position:'absolute',
    bottom:70,
    right: 0,
    padding:5,
    marginRight:10,
    zIndex:1000,
    backgroundColor:'#37ef2ab4',
    borderRadius:50,
  }
})
export default ClickPic;