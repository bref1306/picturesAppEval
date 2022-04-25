import { Camera, CameraCapturedPicture } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { SetStateAction, useRef, useState } from 'react';
import { FlatList, Platform, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { pictureNewType } from '../type/pictureNewType';

const CameraComponent:React.FunctionComponent<{pictureArray: pictureNewType[], setTable: React.Dispatch<React.SetStateAction<pictureNewType[]>>}> = ({setTable, pictureArray, ...props}) => {
    const cameraRef = useRef<Camera|null>();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const takePicture = () => {
       
       cameraRef.current && cameraRef.current.takePictureAsync({base64: true}).then(
        (picture) => {
          let saved = false;
            const pictureNewType : pictureNewType = ({
              ...picture,
              saved
          }); 
          setTable([
            pictureNewType,
            ...pictureArray
          ])
        })
      }
  return (
    <View style={styles.container}>
      <Camera
      style={styles.camera}
          type={type} 
          ref={(camera) => {
            cameraRef.current = camera;
          } }
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={{width: 80}}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              } }>
              <FontAwesome name="rotate-left" size={40} style={{color: '#fff'}} />
            </TouchableOpacity>
            <TouchableOpacity
              touchSoundDisabled={true}
              onPress={() => takePicture()}
              style={styles.buttonTakePicture}
              >

            </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonOther}
             >
            </TouchableOpacity>
          </View>
        </Camera>
        {/* <FlatList
        horizontal={true}
        data={pictureArray}
        renderItem={({ item }) => {
          return (
            <View style={{ borderColor: '#fff', borderWidth: 2, flex: 1/3 }}>
              <Image source={{ uri: 'data:image/jpg;base64,' + item.base64 }} style={{ width: 120, height: 120, borderColor: 'red' }}></Image>
            </View>
          );
        } }
        keyExtractor={(item) => item.uri} 
    /> */}
    </View>
  );
}
export default CameraComponent;


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