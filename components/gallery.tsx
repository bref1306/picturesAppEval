import { CameraCapturedPicture } from "expo-camera";
import React, { useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Modal, Text } from "react-native";

const Gallery:React.FunctionComponent<{pictureArray: CameraCapturedPicture[]}> = ({pictureArray, ...props}) => {
    const [modalPictureVisible, setModalPictureVisible] = useState(false);
    const [picturebase64, setPictureBase64] = useState(Object || undefined);
    return <FlatList
        horizontal={true}
        data={pictureArray}
        renderItem={({ item }) => {
            return (
                <View style={{ borderColor: '#fff', borderWidth: 2, flex: 1 / 3 }}>
                    <TouchableOpacity onPress={() => { setModalPictureVisible(!modalPictureVisible), setPictureBase64(item.base64) }}>
                        <Image source={{ uri: 'data:image/jpg;base64,' + item.base64 }} style={{ width: 120, height: 120, borderColor: 'red' }}>
                        </Image>
                    </TouchableOpacity>
                    <Modal
                    visible={modalPictureVisible}
                    onRequestClose={() => {
                        setModalPictureVisible(!modalPictureVisible);
                      }}
                    >
                        <View><Image source={{ uri: 'data:image/jpg;base64,' + picturebase64 }} style={{ width: '100%', height: '100%', borderColor: 'red' }}></Image></View>

                    </Modal>
                </View>
            );
        } }
        keyExtractor={(item) => item.uri} />;
}
export default Gallery;