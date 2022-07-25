import {StyleSheet,Text,View,TouchableOpacity, SafeAreaView,Modal,TextInput,Image,Alert,Dimensions,} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
  
  export default function EditPost({route}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();
    const firestore = getFirestore();
  
    const [title, setTitle] = useState(route.params.title);
    const [review, setReview] = useState(route.params.review);
  
    const post = async () => {
      if (title == '') {
        Alert.alert("Please enter a suitable title before posting!");
        return;
      }
        const docRef = doc(firestore, "reviews", user.uid, "posts", route.params.post)
        updateDoc(docRef, {
            Title: title,
            Review: review,
        });
      navigation.navigate("PostsScreen");
    };
  
    return (
      <SafeAreaView style={globalStyles.background}>
        <Text style={globalStyles.header}>Edit Post.</Text>
  
        <View style={globalStyles.container}>
  
          <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
  
            <View style={styles.titleInput}>
              <TextInput
                style={globalStyles.TextInput}
                placeholder={title}
                autoCapitalize="none"
                placeholderTextColor="grey"
                autoCorrect={false}
                maxLength={50}
                onChangeText={(title) => setTitle(title)}
                value={title}
              />
            </View>
  
            <View style={styles.reviewInput}>
              <TextInput
                style={globalStyles.TextInput}
                placeholder={review}
                autoCapitalize="none"
                placeholderTextColor="grey"
                autoCorrect={true}
                multiline={true}
                onChangeText={(review) => setReview(review)}
                numberOfLines={50}
                value={review}
              />
            </View>
  
            <TouchableOpacity style={styles.saveChanges} onPress={post}>
              <Text style={globalStyles.avenirFont}>Save!</Text>
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
      padding: 10,
    },
    reviewInput: {
      backgroundColor: "white",
      borderRadius: 3,
      width: width * 0.9,
      height: 400,
      marginBottom: 20,
      alignItems: "center",
      flexWrap: "wrap",
      paddingHorizontal: 10,
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
  