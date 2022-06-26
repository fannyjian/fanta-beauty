import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';

export default function EditProfile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const [image, setImage] = useState(null);
  const storage = getStorage(); 
  const imgRef = ref(storage, 'profile/' + user.uid); 

  useEffect(() => {
    const func = async () => {
      const defaultRef = ref(storage, 'profile/default-profile.jpg')

      await getDownloadURL(imgRef).then((result) => {
        setImage(result);
      }).catch((error) => {
        getDownloadURL(defaultRef).then((result) => {
          setImage(result);
        })
      })
    }

    func();
  }, []);

  const [name, setName] = useState(user.displayName);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Please allow Fanta Beauty to access your photos🥹");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:[1,1]});
    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Please enable camera access for Fanta Beauty🥹");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({allowsEditing: true, aspect:[1,1]});
    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  }

  const saveChanges = async () => {
    if (image != null) {
      const img = await fetch(image);
      const bytes = await img.blob();
      await uploadBytes(imgRef, bytes);
    }
    await updateProfile(auth.currentUser, {displayName: name}).then(() => navigation.goBack());
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style = {globalStyles.header}>Edit Profile.</Text>

      <View style = {globalStyles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imgUpload}>
                  <Text style={styles.loginText}>Upload from Images.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imgUpload} onPress = {takeImage}>
                  <Text style={styles.loginText}>Take a new picture.</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text style={styles.goBack} onPress = {() => setModalVisible(false)}>Cancel.</Text>
              </TouchableOpacity>
              </View>
          </View>
      </Modal>
          
        <TouchableOpacity onPress={() => setModalVisible (true)}>
          <Image source = {{uri : image}} style={ styles.image }/>
        </TouchableOpacity>

        <View style={globalStyles.inputView}>
          <TextInput
              style={globalStyles.TextInput}
              placeholder={auth.currentUser.displayName}
              autoCapitalize="none"
              placeholderTextColor="black"
              onChangeText={(name) => setName(name)}
              autoCorrect = {false}
              value = {name}
              selectTextOnFocus = {true}
          />
          </View>

        <TouchableOpacity style={styles.saveChanges} onPress = {saveChanges}>
            <Text style={styles.loginText}>save my changes.</Text>
        </TouchableOpacity>

        <TouchableOpacity>
              <Text style={styles.goBack} onPress = {() => navigation.goBack()}>back to profile</Text>
        </TouchableOpacity> 

        </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image :{
    margin: 30,
    width: 250,
    height: 250,
    borderRadius: 180,
  },
  saveChanges:{
    width:"70%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#DDC2EF",
  },
  loginText: {
    fontFamily: "Avenir",
    fontSize: 16,
  },
  imgUpload: {
    width:"90%",
    borderRadius:25,
    height:50,
    margin: 10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#DDC2EF",
  },
  goBack: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Avenir",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    height: 250,
    width: 300,
    padding: 35,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});