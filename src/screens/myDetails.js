import {StyleSheet, Text,Image,SafeAreaView,Dimensions,FlatList,View} from "react-native";
  import React, { useState } from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { globalStyles } from "../../styles/globalStyles";
  import { getAuth } from "firebase/auth";
  import {deleteDoc,doc,getFirestore,updateDoc} from "firebase/firestore";
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import { Modal } from "react-native-paper";
  
  const { width, height } = Dimensions.get("screen");
  
  export default function MyDetails({ navigation, route }) {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
  
    const [modalVisible, setModalVisible] = useState(false);
    const [currId, setCurrId] = useState('');

    const deletePost = async () => {
        await deleteDoc(doc(firestore, "reviews", user.uid, "posts", currId));
        setModalVisible(false);
      };

    const openModal = (item) => {
        setModalVisible(true);
        setCurrId(item.DocId);
    }
  
    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.card}>
            <Image
              source={{ uri: item.Image }}
              style={styles.image}
              resizeMode="cover"
            />    
            <View style = {{alignSelf: 'flex-end', marginRight: 15,flexDirection: "row"}}>
                <TouchableOpacity style = {{paddingHorizontal: 5}} onPress = {() => openModal(item)}>
                    <MaterialCommunityIcons name = "delete-outline" color = {"white"} size = {40}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Edit", {post: item.DocId, title: item.Title, review: item.Review})}>
                    <MaterialCommunityIcons name = "pencil-box-outline" color = {"white"} size = {40}/>
                </TouchableOpacity>
            </View>   

            <Text style={styles.title}>{item.Title}</Text>      
            <Text style={styles.text}>{item.Review}</Text>

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
                <Text style = {styles.delete}>Are you sure you want to delete this post?</Text>

                <View style = {{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.imgUpload} onPress = {deletePost}>
                        <MaterialCommunityIcons name = "check" color = {"#DDC2EF"} size = {40}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <MaterialCommunityIcons name = "cancel" color = {"#DDC2EF"} size = {40}/>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>
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
    likes: {
      fontFamily: 'Avenir', 
      alignSelf: "center", 
      fontSize: 19, 
      paddingHorizontal: 2
    },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    },
    modalView: {
    backgroundColor: "white",
    height: height * 0.2,
    width: width * 0.6,
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
    delete: {
        fontFamily: "Avenir",
        fontSize: 18,
        textAlign: 'center',
        color: "black",
        paddingVertical: 10
    }
  });