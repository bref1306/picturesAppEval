import React from "react";
import { Modal, View, Image, Platform } from "react-native";
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import * as Sharing from 'expo-sharing';

const ModalImage:React.FunctionComponent<{picturebase64: Object, pictureUri: Object, modalPictureVisible : boolean,  setModalPictureVisible:  React.Dispatch<React.SetStateAction<boolean>>}> = ({picturebase64, pictureUri, setModalPictureVisible,modalPictureVisible, ...props}) => {
      
    // const uploadPicture = async (uri : Object) => {
    // await axios.patch("http://localhost:7070/multipart-upload", {uri})
    // .then((result) => {
    //    console.log('ça marche')
    // })
    // .catch((error) => {
    //     if(error.response) {
    //         if(error.response.data.errors) {
    //           console.log('marche pas')
    //         }
    //     }
    // })
    // }
    const uploadImage = async (uri : string) => {
      //Check if any file is selected or not
      if (uri != null) {
        //If file selected then create FormData
        const fileToUpload = uri;
        const data = new FormData();
        data.append('photo', {name: 'Image', uri : fileToUpload, type:'image/jpg'});
        console.log(data);
        let res = await fetch(
          'https://7a66-212-106-119-25.eu.ngrok.io/multipart-upload',
          {
            method: 'patch',
            body: data,
          }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
          alert('Upload Successful');
        }
      } else {
        //if no file selected the show alert
        alert('Please Select File first');
      }
  };
  // const uploadImage = async(uri: Object) => {
  //   var bodyFormData = new FormData();
  //   bodyFormData.append('photo', uri.toString()); 
  //  await axios({
  //     method: "post",
  //     url: "http://localhost:7070/multipart-upload",
  //     data: bodyFormData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then(function (response) {
  //       //handle success
  //       console.log(response);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log(response);
  //     });
  // }
  
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
            <FontAwesome name="upload" size={40} style={{color: '#fff', position: 'absolute', padding:20, marginLeft: 60}}  onPress={() => {uploadImage(pictureUri.toString())}}></FontAwesome>
        </View>

    </Modal>
}
export default ModalImage;