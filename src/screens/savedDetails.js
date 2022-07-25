import {StyleSheet, Text,Image,SafeAreaView,Dimensions,FlatList,View} from "react-native";
  import React, { useState } from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { globalStyles } from "../../styles/globalStyles";
  import { getAuth } from "firebase/auth";
  import {deleteDoc,doc,getFirestore,updateDoc} from "firebase/firestore";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import { Modal } from "react-native-paper";
  
  const { width, height } = Dimensions.get("screen");
  
  export default function SavedDetails({ navigation, route }) {
    const posts = route.params.data;
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
  
    const [modalVisible, setModalVisible] = useState(false);
  
    const unsavePost = async (item) => {
      await deleteDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId));
      setModalVisible(true);
    };

    const increment = async (item) => {
      updateDoc(doc(firestore, "reviews", user.uid, "posts", item.DocId), {
        Likes: item.Likes + 1
      });
      updateDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId), {
        Likes: item.Likes + 1
      }).catch((error) => 
        updateDoc(doc(firestore, "reviews", user.uid, "posts", item.DocId), {
          Likes: item.Likes + 1
        })
      );
    }
  
    const decrement = async (item) => {
      updateDoc(doc(firestore, "reviews", user.uid, "posts", item.DocId), {
        Likes: item.Likes - 1
      });
      updateDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId), {
        Likes: item.Likes - 1
      }).catch((error) => 
      updateDoc(doc(firestore, "reviews", user.uid, "posts", item.DocId), {
        Likes: item.Likes + 1
      })
      );
    }
  
    const renderItem = ({ item, index }) => {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
          <TouchableOpacity onPress = {() => unsavePost(item)} >
            <MaterialCommunityIcons name="star" size={30} color={"#D39ED8"}/>
          </TouchableOpacity>
  
          </View>
  
          <View style={styles.card}>
            <Image
              source={{ uri: item.Image }}
              style={styles.image}
              resizeMode="cover"
            />
  
            <View style={{flexDirection: "row", alignSelf: "flex-end", paddingHorizontal: 5}}>
              <TouchableOpacity onPress = {() => increment(item)}>
                <MaterialCommunityIcons
                name="arrow-up-bold-outline"
                size={30}
                color={"#D39ED8"}
                />
              </TouchableOpacity>

              <Text style = {styles.likes}>{item.Likes}</Text>
  
              <TouchableOpacity onPress = {() => decrement(item)}>
                <MaterialCommunityIcons
                name="arrow-down-bold-outline"
                size={30}
                color={"#D39ED8"}
                style = {{paddingHorizontal: 2}}
                />
              </TouchableOpacity>
              
              <TouchableOpacity onPress = {() => navigation.navigate('Comments', {post: item.DocId, user: item.UserId})}>
                <MaterialCommunityIcons
                  name="chat-outline"
                  size={30}
                  color={"#D39ED8"}
                  style = {{paddingHorizontal: 2}}
                  />
              </TouchableOpacity>
            </View>
  
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.text}>{item.Review}</Text>
  
          </View>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={globalStyles.background}>
  
        <FlatList
          data={route.params.data}
          initialScrollIndex={route.params.initialScroll}
          getItemLayout={(data, index) => ({
            length: height * 0.75,
            offset: (height * 0.76) * index,
            index,
          })}
          style={{ marginBottom: height * 0.06 }}
          contentContainerStyle={{ alignSelf: "center" }}
          renderItem={renderItem}
        />
        <View>
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
                <Text style = {styles.mainText}>Item successfully removed!</Text>
  
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.goBack}>
                    Back.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    row: {
      flex: 1,
      justifyContent: "space-around",
    },
    image: {
      width: width * 0.9,
      height: width * 0.9,
      resizeMode: "cover",
      borderRadius: 10,
    },
    card: {
      width: width * 0.9,
      height: height * 0.7,
      backgroundColor: "#00000000",
      marginBottom: width * 0.05,
      alignItems: "center",
      backgroundColor: "#E7D5E9",
      borderRadius: 10,
    },
    header: {
      fontFamily: "AbrilFatface_400Regular",
      fontSize: 60,
      color: "white",
      backgroundColor: "#00000000",
    },
    text: {
      marginTop: width * 0.02,
      marginHorizontal: width * 0.01,
      fontFamily: "Avenir",
      fontSize: 15,
      alignSelf: "flex-start",
      paddingBottom: 10,
    },
    title: {
      fontFamily: "AbrilFatface_400Regular",
      fontSize: 30,
      color: "white",
      shadowColor: "black",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      marginHorizontal: width * 0.01,
      alignSelf: "flex-start",
    },
    mainText: {
      fontSize: 28,
      textAlign: 'center',
      fontFamily: "AbrilFatface_400Regular",
      color: "#DDC2EF",
      alignSelf: "center",
    },
    goBack: {
      fontSize: 18,
      marginTop: 40,
      fontFamily: "Avenir",
      color: "black",
      alignSelf: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: - height,
    },
    modalView: {
      backgroundColor: "white",
      width: width * 0.8,
      padding: 30,
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
    likes: {
      fontFamily: 'Avenir', 
      alignSelf: "center", 
      fontSize: 19, 
      paddingHorizontal: 2
    },
  });