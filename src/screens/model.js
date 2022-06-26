import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView, Modal, TextInput, TouchableHighlight, Alert
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import React, { useState } from "react";
import Icon from "react-native-ico-material-design";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

const iconHeight = 40;
const iconWidth = 40;

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );


export default function Model() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const storage = getStorage(); 
  const storageRef = ref(storage, 'wishlist/' + user.uid + '/' + v4());

  const [image, setImage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const [link, setLink] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Please allow Fanta Beauty to access your photos🥹");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, 
      aspect:[4,3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  };

  const pressedLink = () => {
    setModalVisible(false);
    setTextVisible(true);
  }

  const enterLink = () => {
    setImage(link);   
    setTextVisible(false);
  }

  const saveLook = async () => {
    const img = await fetch(image).catch((error) => Alert.alert('Upload failed 😣\nPlease try again!'));
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);  
    setImage('profile-logo.png');
    setWishlistVisible(true);
  }

  const toWishlist = () => {
    setWishlistVisible(false);
    navigation.navigate('WishlistScreen');
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style={globalStyles.header}>Model it.</Text>

      <View style={globalStyles.container}>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={wishlistVisible}
          onRequestClose={() => {
            setWishlistVisible(!wishlistVisible);}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

                <Text style={styles.loginText}>Upload success! 🥳 {'\n'} Visit your wishlist? </Text>

                <TouchableOpacity style={styles.wishlist} onPress = {toWishlist}>
                    <Text style={styles.loginText}>Yes please!</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.cancel} onPress = {() => setWishlistVisible(false)}>Maybe next time!</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <TouchableHighlight onPress={() => setModalVisible(true)} underlayColor="0000ffff">
          <Avatar.Image size={300} source={{ uri: image }}/>
        </TouchableHighlight>

        {/* <TouchableHighlight
          onPress={() => alert("pressed")}
          underlayColor="0000ffff"
        >
          <Avatar.Image
            size={200}
            source={{ uri: "data:image/png;base64," + Image }}
          />
        </TouchableHighlight> */}
          
        <View style={styles.screenContainer}>
          <View>
            <AppButton title="add clothing" onPress={() => setModalVisible(true)} />
          </View>

          <TouchableOpacity onPress = {() => setImage('profile-logo.png')}>
            <Icon
              name="refresh-button"
              height={iconHeight}
              width={iconWidth}
              color="black"
            ></Icon>
          </TouchableOpacity>

          <AppButton title="save this look" backgroundColor="#007bff" onPress={saveLook}/>

        </View>
      </View>
    </SafeAreaView>
  );
  s;
}

const styles = StyleSheet.create({
  image: {
    flex: 0.6,
    width: 350,
    height: 350,
    justifyContent: "flex-end",
  },
  screenContainer: {
    flexDirection: "row",
    padding: 15,
    position: "absolute",
    bottom: 100,
    justifyContent: "space-evenly",
    borderRadius: 40,
  },
  appButtonContainer: {
    width: 129,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
  },
  appButtonText: {
    fontSize: 18,
    fontFamily: "AbrilFatface_400Regular",
    color: "black",
    alignSelf: "center",
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
  wishlist: {
    width:"90%",
    borderRadius:25,
    height:50,
    marginTop: 30,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#DDC2EF",
  },
  cancel: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Avenir",
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