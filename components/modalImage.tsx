import React from "react";
import { Modal, View } from "react-native";

const ModalImage:React.FunctionComponent<{picturebase64: Object,modalPictureVisible : boolean,  setModalPictureVisible: React.SetStateAction<boolean>}> = ({picturebase64, setModalPictureVisible,modalPictureVisible, ...props}) => {
    return <Modal
    visible={modalPictureVisible}
    onRequestClose={() => {
        setModalPictureVisible(!modalPictureVisible);
    }}
    >
        <View>
            <Image source={{ uri: 'data:image/jpg;base64,' + picturebase64 }} style={{ width: '100%', height: '100%', borderColor: 'red' }}></Image>
        </View>

    </Modal>
}
export default ModalImage;