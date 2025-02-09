import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View ,Text, Image, TouchableOpacity, ImageSourcePropType} from "react-native";
import { MapView,RasterSource,Camera,RasterLayer, MarkerView,PointAnnotation, MapViewRef, CameraRef } from '@maplibre/maplibre-react-native';
import treeIcon from '@/assets/images/tree-marker.png';
import TreeCardModal from './TreeModal';
import { Position } from 'geojson';
import { useAppContext } from '@/app/context/AppContext';
import { configureProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const mapTilerApiKey = process.env.EXPO_PUBLIC_MAPTILER_API_KEY
console.log('map api key',mapTilerApiKey)
type Tree = {
  locationData: {
    latitude: number;
    longitude: number;
  };
  id: number;
  name: string | null;
  notes: string | null;
  location:string | null;
  images:ImageType[] | null;
  planter:{
    id:number;
    name:string;
    email:string;
  };
  caretakers:Array<number|null> | null;
  plantedAt:any | null,
  species:string |null
};
type ImageType = {
  id:number;
  treeId:number;
  imageUrl:string | undefined;
  uploadedAt:any
}

const mapStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`;
const MapComponent = () => {
  const {selectedTree, setSelectedTree} = useAppContext()
  const [trees, setTrees] = useState<Array<Tree> | null>([]);
  const [tree,setTree] = useState<Tree | null>(null);
  const [center, setCenter] = useState<Position | null>(null);
  const [isResponse,setIsResponse] = useState<boolean>(true)
  const cameraViewRef = useRef<CameraRef>(null);
 
  useEffect(()=>{
    // const fetchUserLocation
    
    const fetchTrees = async () => {
      console.log('Fetching trees from sever..');
      // Fetch trees from server
      const response = await fetch(`${apiUrl}/protected/get-trees`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(data){
        setTrees(data)
      }
      
      console.log('Trees:', data);
    }
      console.log('Fetching trees...');
      setCenter([77.1203184,28.6885075])
      fetchTrees();
    
  },[])

  useEffect(() => {
    if (selectedTree) {
      console.log('Selected tree:', selectedTree);
      setCenter([selectedTree.locationData.longitude,selectedTree.locationData.latitude])
      cameraViewRef.current?.setCamera({
        centerCoordinate:[selectedTree.locationData.longitude,selectedTree.locationData.latitude],
      })
      getTreeInfo(selectedTree.id,selectedTree.locationData);
    }
  }, [selectedTree]);

  useEffect(()=>{
    console.log(center,'center')
  },[center])
  const getTreeInfo = async (id: number,locationData : {longitude : number, latitude:number}) => {
    const response = await fetch(`${apiUrl}/protected/get-tree/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(id,'id',locationData,'locationData')
    const data:Tree = await response.json();
    const {images, species, notes, plantedAt,planter,caretakers,name=null} = data
    const locationName = await fetchGeocodingData(locationData)
    console.log(locationName,'location name')
    console.log('Tree info:', data);
    setTree({
      id,
      species,
      notes,
      images,
      planter,
      caretakers,
      plantedAt,
      locationData,
      location:locationName,
      name:name
    })
  }
  
  const fetchGeocodingData = async (locationData : {longitude : number, latitude:number}) => {
    try {
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${locationData.longitude},${locationData.latitude}.json?key=${mapTilerApiKey}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name
      } else {
        return 'Location Data not found'
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };
  return (
       <View style={styles.container}>
      <MapView style={styles.map} mapStyle={mapStyleUrl} onPress={()=> console.log('map clicked')} >
        {center && <Camera zoomLevel={16} centerCoordinate={center} ref={cameraViewRef}/>}
        {trees && trees.map((tree, index) => (
          <MarkerView
            key={index}
            id={tree.id.toString()}
            coordinate={[tree.locationData.longitude, tree.locationData.latitude]}
            onTouchStart={() => {
              setSelectedTree(tree)
            }}
            className='z-[1000]'
          >
             <View style={styles.markerContainer}>
           <Image
            source={treeIcon}
            style={{ width: 40, height: 40 }}/>
            </View>
          </MarkerView>
        ))}
      </MapView>
      {selectedTree && 
      <TreeCardModal
      isVisible={!!tree}
      tree={tree}
      onClose={()=> {setSelectedTree(null)
        setTree(null)
      }}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapComponent;
