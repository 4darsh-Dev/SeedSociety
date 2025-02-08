import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image'
import { useRef, useState } from 'react';
import { Dimensions,Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo,setPhoto] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  const takePic = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      if(photo.uri){
      setPhoto(photo.uri);}
    }
  };
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shutter} onPress={takePic}>
          <Entypo name="circle" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.switch} onPress={toggleCameraFacing}>
            <MaterialIcons name="cameraswitch" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
      {photo && <Image source={{ uri: photo }} style={styles.image}/>}
    </View>
  );
}
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    display:'flex',
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width:screenWidth,
    flexDirection: 'row',
    marginBottom: 100,
    alignItems:'center',
    justifyContent:'center',
    // gap:50,
  },
  switch: {
    position: 'absolute',
    right: 60,
  },
  shutter: {
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    position:'absolute',
    bottom:0,
    right: 10,
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
  },
});
