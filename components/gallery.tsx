import { CameraCapturedPicture } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Modal, Text, Button } from "react-native";
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import * as MediaLibrary from 'expo-media-library';
import { BottomSheet } from "react-native-elements";

const Gallery:React.FunctionComponent<{pictureArray: CameraCapturedPicture[], setTable: React.Dispatch<React.SetStateAction<CameraCapturedPicture[]>>}> = ({pictureArray, setTable, ...props}) => {
    
    const [modalPictureVisible, setModalPictureVisible] = useState(false);
    const [picturebase64, setPictureBase64] = useState(Object || undefined);
    const [hasPermission, setHasPermission] = useState(Boolean||null);
    const [visibleIcon, setVisibleIcon] = useState(false);
    const [BottomSheetVisible, setVisibleBottomSheet] = useState(false);
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
                            </View>

                        </Modal>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                        <FontAwesome name="save" size={40} style={{color: '#000'}} onPress={ 
                            () => {
                                saveGallery(item.uri)
                            }} />
                        <FontAwesome name="close" size={40} style={{color: '#000'}} onPress={ 
                            () => {
                            setVisibleBottomSheet(true)
                            }} />
                    </View>
                    <BottomSheet
                    isVisible={BottomSheetVisible}
                    >
                        <View style={{ backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={() => deletePicture(item.uri)}>
                            <Text style={{ padding: 10, textAlign: "center" }}>Supprimer</Text>
                        </TouchableOpacity>
                        <Button  title="Annuler" color="red" onPress={() => { setVisibleBottomSheet(false)}}></Button>
                            
                        </View>
                    </BottomSheet>
                </View> 
            );
        } }
        keyExtractor={(item) => item.uri} />;
}
export default Gallery;