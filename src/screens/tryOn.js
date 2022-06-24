import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

export default function TryOn() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  // const firestore = getFirestore();
  const storage = getStorage(); 
  const storageRef = ref(storage, 'wishlist/' + user.uid + '/' + v4());

  const [image, setImage] = useState(null);


  const [modalVisible, setModalVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [link, setLink] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Please allow Fanta Beauty to access your photos🥹");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:[1,1]});
    if (!result.cancelled) {
      setImage(result.uri);
      const img = await fetch(image).catch((error) => Alert.alert('Upload failed😞\nPlease try again!'));
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes);
      setModalVisible(false);
      Alert.alert('Upload success! 🥳')
    }
  };

  const pressedLink = () => {
    setModalVisible(false);
    setTextVisible(true);
  }

  const enterLink = async () => {
    setImage(link);
    const img = await fetch(image).catch((error) => Alert.alert('Please upload a valid image URL!'));
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);     
    setTextVisible(false);
    Alert.alert('Upload success! 🥳')
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style = {globalStyles.header}>Try It On.</Text>

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

                <TouchableOpacity style={styles.imgUpload} onPress = {pressedLink}>
                    <Text style={styles.loginText}>Enter image link.</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.goBack} onPress = {() => setModalVisible(false)}>Cancel.</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={textVisible}
          onRequestClose={() => {
            setModalVisible(!textVisible);}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                    style={globalStyles.TextInput}
                    placeholder='Paste your URL here!'
                    autoCapitalize="none"
                    placeholderTextColor="black"
                    onChangeText={(url) => setLink(url)}
                    autoCorrect = {false}
                    value = {link}
                    selectTextOnFocus = {true}/>

                <TouchableOpacity style = {styles.imgUpload}>
                    <Text style={styles.loginText} onPress = {enterLink}>Upload URL.</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.goBack} onPress = {() => setTextVisible(false)}>Cancel.</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <Text style = {styles.dummy}>This is a dummy page for image upload :)</Text>
            
    <TouchableOpacity style = {styles.imgUpload} onPress={() => setModalVisible (true)}>
        <Text style = {styles.loginText}>Upload image.</Text>
    </TouchableOpacity>

    <TouchableOpacity style = {styles.imgUpload} onPress={() => navigation.navigate('WishlistScreen')}>
        <Text style = {styles.loginText}>To my wishlist!</Text>
    </TouchableOpacity>

    </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image :{
    margin: 150,
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
  dummy: {
    marginTop: 200,
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