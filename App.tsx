import Camera, { CameraCapturedPicture } from 'expo-camera/build/Camera';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Modal, SafeAreaView, StatusBar, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from './components/cameraComponent';
import Gallery from './components/gallery';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasPermission, setHasPermission] = useState(Boolean||null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef<Camera|null>();
  
const [pictureArray, setTable] = useState<Array<CameraCapturedPicture>>([]);
 
  // const saveGallery = async (uri : string) => {
  //     const res = await MediaLibrary.requestPermissionsAsync()
  //     if (res.granted) {
  //       MediaLibrary.saveToLibraryAsync(uri);
  //     }
  //   }
   
  async function save(key : string, value : string) {
    await AsyncStorage.setItem(key, value);
  }

  // useEffect(() => {
  //   if (pictureArray.length == 0) {
  //     AsyncStorage.getItem('savedPicture').then((data) => {
  //       data && save('savedPicture', JSON.stringify(data));
  //     })
  //   }
  //   if (pictureArray.length > 0) {
  //     save('savedPicture', JSON.stringify(pictureArray));
  //   }
  // }, [pictureArray]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      try {
        const res = await MediaLibrary.requestPermissionsAsync();
        
      } catch (error) {
        console.log(error);
      }
      // if (res.granted) {
      //   console.log('accepté')
      // }else {
      //   console.log('merde')
      // }
      // const granted = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
     
    })();
  }, []);



  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.parentContainer}>
    <StatusBar hidden={false}></StatusBar>
    <View style={styles.container}>
      
      <Button
        onPress={() => {
          setModalVisible(!modalVisible)
        }}
        title="Prendre une photo"
        color="#841584"
      />
      <Gallery setTable={setTable} pictureArray={pictureArray}></Gallery>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        } } >

        <CameraComponent pictureArray={pictureArray} setTable={setTable}></CameraComponent>
      </Modal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-between'
  },
  camera: {
    flex: 1,
  },
  containerIcon: {
    backgroundColor:'#000', 
    height:45, 
    width:45, 
    borderRadius: 50, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 10,
  },
  buttonTakePicture: {
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  buttonOther: {
    width: 80,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
