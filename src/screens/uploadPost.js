import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "@firebase/storage";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function UploadPost() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const storage = getStorage();
  const storageRef = ref(storage, "collects/" + user.uid + "/" + v4());
  const firestore = getFirestore();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([
    { label: "Tops", value: "Tops" },
    { label: "Short-sleeved", value: "Short-sleeved", parent: "Tops" },
    { label: "Long-sleeved", value: "Long-sleeved", parent: "Tops" },
    { label: "Sleeveless", value: "Sleeveless", parent: "Tops" },
    { label: "Bottoms", value: "Bottoms" },
    { label: "Skirts", value: "Skirts", parent: "Bottoms" },
    { label: "Shorts", value: "Shorts", parent: "Bottoms" },
    { label: "Pants", value: "Pants", parent: "Bottoms" },
    { label: "Dresses", value: "Dresses" },
    { label: "One Pieces", value: "One Pieces" },
    { label: "Outerwear", value: "Outerwear" },
    { label: "Shoes", value: "Shoes" },
    { label: "Heels", value: "Heels", parent: "Shoes" },
    { label: "Flats", value: "Flats", parent: "Shoes" },
    { label: "Sneakers", value: "Sneakers", parent: "Shoes" },
    { label: "Sport Shoes", value: "Sport Shoes", parent: "Shoes" },
    { label: "Boots", value: "Boots", parent: "Shoes" },
    { label: "Accessories", value: "Accessories" },
    { label: "Earrings", value: "Earrings", parent: "Accessories" },
    { label: "Necklaces", value: "Necklaces", parent: "Accessories" },
    { label: "Bracelets", value: "Bracelets", parent: "Accessories" },
    { label: "Rings", value: "Rings", parent: "Accessories" },
    {
      label: "Hair Accessories",
      value: "Hair Accessories",
      parent: "Accessories",
    },
    { label: "Others", value: "Others" },
  ]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Please allow Fanta Beauty to access your photos🥹");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
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
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(false);
    }
  };

  const post = async () => {
    if (image == null) {
      Alert.alert("Please upload an image before posting!");
      return;
    }
    if (category == null) {
      Alert.alert("Please select a category before posting!");
      return;
    }
    if (title == null) {
      Alert.alert("Please enter a suitable title before posting!");
      return;
    }
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(storageRef, bytes);
    getDownloadURL(storageRef).then((url) => {
      setDoc(doc(firestore, "reviews", user.uid, "posts", v4()), {
        Image: url,
        Category: category,
        Title: title,
        Review: review,
        Date: new Date(),
        UserId: user.uid,
      });
    });
    navigation.navigate("ProfileScreens");
  };

  const UploadButtons = () =>
    image == null ? (
      <View
        style={{
          flexDirection: "row",
          marginTop: width * 0.05,
          marginBottom: width * 0.1,
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <MaterialCommunityIcons
            name="image-outline"
            color={"#DDC2EF"}
            size={height * 0.06}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={takeImage}>
          <MaterialCommunityIcons
            name="camera-outline"
            color={"#DDC2EF"}
            size={height * 0.06}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style={globalStyles.header}>Review.</Text>

      <View style={globalStyles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={pickImage} style={styles.imgUpload}>
                <Text style={styles.loginText}>Upload from Images.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imgUpload} onPress={takeImage}>
                <Text style={styles.loginText}>Take a new picture.</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={styles.goBack}
                  onPress={() => setModalVisible(false)}
                >
                  Cancel.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <KeyboardAwareScrollView
          contentContainerStyle={{ alignItems: "center" }}
        >
          <UploadButtons />

          <DropDownPicker
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            listMode="SCROLLVIEW"
            scrollViewProps={{ nestedScrollEnabled: true }}
            onChangeValue={(value) => {
              setCategory(value);
            }}
            placeholder="Category"
            placeholderTextColor="white"
            containerStyle={{
              width: width * 0.7,
              marginTop: -10,
              marginBottom: 15,
            }}
            style={{
              paddingVertical: 10,
              borderColor: "grey",
              borderRadius: 5,
              backgroundColor: "#F3E9F9",
            }}
            dropDownContainerStyle={{
              borderColor: "grey",
              borderRadius: 0,
              backgroundColor: "#F3E9F9",
            }}
          />

          <View style={styles.titleInput}>
            <TextInput
              style={globalStyles.TextInput}
              placeholder="  Add title."
              autoCapitalize="none"
              placeholderTextColor="grey"
              autoCorrect={false}
              maxLength={50}
              onChangeText={(title) => setTitle(title)}
            />
          </View>

          <View style={styles.reviewInput}>
            <TextInput
              style={globalStyles.TextInput}
              placeholder="  Enter your review."
              autoCapitalize="none"
              placeholderTextColor="grey"
              autoCorrect={true}
              multiline={true}
              onChangeText={(review) => setReview(review)}
              numberOfLines={50}
            />
          </View>

          <TouchableOpacity style={styles.saveChanges} onPress={post}>
            <Text style={globalStyles.avenirFont}>Post!</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
  s;
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  image: {
    width: width * 0.9,
    height: width * 0.9,
    marginBottom: 30,
    borderRadius: 10,
  },
  titleInput: {
    backgroundColor: "white",
    borderRadius: 3,
    width: width * 0.9,
    height: 45,
    marginBottom: 15,
    alignItems: "center",
    flexWrap: "wrap",
  },
  reviewInput: {
    backgroundColor: "white",
    borderRadius: 3,
    width: width * 0.9,
    height: 400,
    marginBottom: 20,
    alignItems: "center",
    flexWrap: "wrap",
  },
  saveChanges: {
    width: "70%",
    borderRadius: 25,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDC2EF",
  },
  loginText: {
    fontFamily: "Avenir",
    fontSize: 16,
  },
  imgUpload: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDC2EF",
  },
  collects: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDC2EF",
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
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
