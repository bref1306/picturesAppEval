import React from "react";
import { Modal, View, Image, Platform } from "react-native";
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import * as Sharing from 'expo-sharing';

const ModalImage:React.FunctionComponent<{picturebase64: Object, pictureUri: Object, modalPictureVisible : boolean,  setModalPictureVisible:  React.Dispatch<React.SetStateAction<boolean>>}> = ({picturebase64, pictureUri, setModalPictureVisible,modalPictureVisible, ...props}) => {
      
      let openShareDialogAsync = async (item : Object)  => {
        if (Platform.OS === 'web') {
         console.log('pas valable')
          return;
        }
    
        await Sharing.shareAsync(item.toString());
      };
    return <Modal
    visible={modalPictureVisible}
    onRequestClose={() => {
        setModalPictureVisible(!modalPictureVisible);
    }}
    >
        <View>
            <Image source={{ uri: 'data:image/jpg;base64,' + picturebase64 }} style={{ width: '100%', height: '100%', borderColor: 'red' }}></Image>
            <FontAwesome name="share" size={40} style={{color: '#fff', position: 'absolute', padding:20}}  onPress={() => openShareDialogAsync(pictureUri)}></FontAwesome>
        </View>

    </Modal>
}
export default ModalImage;