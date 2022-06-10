import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
  const navigation = useNavigation();
  const auth = getAuth();

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Please allow Fanta Beauty to access your photos 🥹");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

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
    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  }

  const saveChanges = () => {
    if (name == '') {
      navigation.goBack();
      return;
    }
    updateProfile(auth.currentUser, {displayName: name})
    .then(() => navigation.goBack());
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
                  style={styles.loginBtn}>
                  <Text style={styles.loginText}>Upload from Images.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginBtn} onPress = {takeImage}>
                  <Text style={styles.loginText}>Take a new picture.</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text style={styles.goBack_button} onPress = {() => setModalVisible(false)}>Cancel.</Text>
              </TouchableOpacity>
              </View>
          </View>
      </Modal>
          
        <TouchableOpacity onPress={() => setModalVisible (true)}>
          <Image source = {{uri : image}} defaultSource = {require('../../assets/default-profile.jpeg')} style={ styles.image }/>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput
              style={styles.TextInput}
              placeholder={auth.currentUser.displayName}
              autoCapitalize="none"
              placeholderTextColor="black"
              onChangeText={(name) => setName(name)}
              autoCorrect = {false}
              value = {name}
          />
          </View>

        <TouchableOpacity style={styles.loginBtn} onPress = {saveChanges}>
            <Text style={styles.loginText}>save my changes.</Text>
        </TouchableOpacity>

        <TouchableOpacity>
              <Text style={styles.goBack_button} onPress = {() => navigation.goBack()}>back to profile</Text>
        </TouchableOpacity> 

        </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image :{
    marginBottom: 20,
    width: 250,
    height: 250,
    borderRadius: 180,
  },
  inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },   
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontFamily: "Avenir",
    fontSize: 15,
  },
  loginBtn:{
    width:"90%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    backgroundColor:"#DDC2EF",
  },
  loginText: {
      fontFamily: "Avenir",
      fontSize: 16,
  },
  goBack_button: {
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