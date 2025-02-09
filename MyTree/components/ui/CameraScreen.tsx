import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Dimensions,Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CameraScreenProps {
  getCurrentLocation: () => Promise<void>;
  setPhotoUri:(photo: string | null) => void;
  setPhoto: (photo: CameraCapturedPicture | null) => void;
}
const CameraScreen:React.FC<CameraScreenProps> =({getCurrentLocation, setPhotoUri, setPhoto})=> {
 
  //Camera Setup
  const [facing, setFacing] = useState<CameraType>('back');
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
      if (photo && photo.uri) {
        setPhoto(photo)
        setPhotoUri(photo.uri);
      }
      getCurrentLocation()
    }
  };
  
  return (
    <>
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
      
      </>
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
 
});
export default CameraScreen;