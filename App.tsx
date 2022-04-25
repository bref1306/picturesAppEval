import Camera, { CameraCapturedPicture } from 'expo-camera/build/Camera';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Modal, Image, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from './components/cameraComponent';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

export default function App() {
  const [hasPermission, setHasPermission] = useState(Boolean||null);;
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
    const takePicture = () => {
     cameraRef.current && cameraRef.current.takePictureAsync({base64: true}).then((picture) => {
      const CapturedPicture : CameraCapturedPicture = ({
        ...picture,
     }); 
       setTable([
         ...pictureArray,
         CapturedPicture
      ])
     })
    }
  async function save(key : string, value : string) {
    await AsyncStorage.setItem(key, value);
  }
  
  useEffect(() => {
    if (pictureArray.length == 0) {
      AsyncStorage.getItem('savedPicture').then((data) => {
        data && save('savedPicture', JSON.stringify(data));
      })
    }
    if (pictureArray.length > 0) {
      save('savedPicture', JSON.stringify(pictureArray));
    }
  }, [pictureArray]);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      
      <Button
        onPress={() => {setModalVisible(!modalVisible)}}
        title="Prendre une photo"
        color="#841584"
      />
      <FlatList
        horizontal={true}
        data={pictureArray}
        inverted={true}
        renderItem={({ item }) => {
          return (
            <View style={{ borderColor: '#fff', borderWidth: 2, flex: 1/3 }}>
              <Image source={{ uri: 'data:image/jpg;base64,' + item.base64 }} style={{ width: 120, height: 120, borderColor: 'red' }}></Image>
            </View>
          );
        } }
        keyExtractor={(item) => item.uri} 
    />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        } } >
           <View style={styles.container}>
     
        <CameraComponent pictureArray={pictureArray} setTable={setTable}></CameraComponent>
    </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
