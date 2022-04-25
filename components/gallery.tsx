import { CameraCapturedPicture } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Modal, Text, Button, Platform } from "react-native";
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import * as MediaLibrary from 'expo-media-library';
import { BottomSheet } from "react-native-elements";
import * as Sharing from 'expo-sharing';
import ModalImage from "./modalImage";
import { pictureNewType } from "../type/pictureNewType";
const Gallery:React.FunctionComponent<{pictureArray: pictureNewType[], setTable: React.Dispatch<React.SetStateAction<pictureNewType[]>>}> = ({pictureArray, setTable, ...props}) => {
    
    const [modalPictureVisible, setModalPictureVisible] = useState(false);
    const [picturebase64, setPictureBase64] = useState(Object || undefined);
    const [hasPermission, setHasPermission] = useState(Boolean||null);
    const [visibleIcon, setVisibleIcon] = useState(false);
    const [BottomSheetVisible, setVisibleBottomSheet] = useState(false);
    // const saved : pictureNewType = ([
    //     ...pictureArray,
    //     true
    // ]); 
    const saveGallery = async (uri : string) => {
      const res = await MediaLibrary.requestPermissionsAsync()
      if (res.granted) {
        MediaLibrary.saveToLibraryAsync(uri);
      }
    }
    const deletePicture = (uri: Object) => {
        pictureArray = pictureArray.filter(picture => picture.uri !== uri);
        setTable([
            ...pictureArray
        ])
    }
    useEffect(() => {
        (async () => {
          const { status } = await MediaLibrary.requestPermissionsAsync()
          setHasPermission(status === 'granted');
        })();
      }, []);
      
      let openShareDialogAsync = async (item : Object)  => {
        if (Platform.OS === 'web') {
         console.log('pas valable')
          return;
        }
    
        await Sharing.shareAsync(item.toString());
      }; 
    return <FlatList
        horizontal={true}
        data={pictureArray}
        renderItem={({ item }) => {
            return (
                <View style={{ flexDirection:'column', justifyContent:'space-between', height: '40%' }}>       
                    <View style={{ borderColor: '#fff', borderWidth: 2, flex: 1 / 3 }}>
                        <TouchableOpacity onPress={() => { 
                            setModalPictureVisible(!modalPictureVisible), 
                            setPictureBase64(item.base64) 
                        }}>
                            <Image source={{ uri: 'data:image/jpg;base64,' + item.base64 }} style={{ width: 120, height: 120, borderColor: 'red' }}>
                            </Image>
                        </TouchableOpacity>
                        <Modal
                        visible={modalPictureVisible}
                        onRequestClose={() => {
                            setModalPictureVisible(!modalPictureVisible);
                        }}
                        >
                            <View>
                                <Image source={{ uri: 'data:image/jpg;base64,' + picturebase64 }} style={{ width: '100%', height: '100%', borderColor: 'red' }}></Image>
                                <FontAwesome name="share" size={40} style={{color: '#fff', position: 'absolute', padding:20}}  onPress={() => openShareDialogAsync(item.uri)}></FontAwesome>
                            </View>

                        </Modal>
                        {/* <ModalImage picturebase64={picturebase64} setModalPictureVisible={setModalPictureVisible} modalPictureVisible={modalPictureVisible}></ModalImage> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                        <FontAwesome name={item.saved ? "save" : "cloud" } size={40} style={{color: '#000'}} onPress={ 
                            () => {
                                saveGallery(item.uri)
                                pictureArray.forEach((picture) => {
                                    if (picture.uri == item.uri) {
                                        item.saved = true
                                    }
                                },
                                setTable([
                                    ...pictureArray
                                ])
                                    
                                )
                            }} />
                            
                        <FontAwesome name="close" size={40} style={{color: '#000'}} onPress={ 
                            () => {
                            setVisibleBottomSheet(true)
                        }} />
                    </View>
                    <BottomSheet isVisible={BottomSheetVisible}>
                        <View style={{ backgroundColor: 'red' }}>
                            <TouchableOpacity onPress={() => deletePicture(item.uri)}>
                                <Text style={{ padding: 10, textAlign: "center", color:"#fff" }}>Supprimer</Text>
                            </TouchableOpacity>
                            <Button  title="Annuler" color="black" onPress={() => {setVisibleBottomSheet(false)}}></Button>
                        </View>
                    </BottomSheet>
                </View> 
            );
        } }
        keyExtractor={(item) => item.uri} />;
}
export default Gallery;