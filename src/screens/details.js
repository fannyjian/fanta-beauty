import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

export default function Details({ navigation, route }) {
  const posts = route.params.data;
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();

  const [modalVisible, setModalVisible] = useState(false);

  const savePost = async (item) => {
    setDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId), {
      Image: item.Image,
      Category: item.Category,
      Title: item.Title,
      Review: item.Review,
      Date: item.Date,
      UserId: item.UserId,
      DocId: item.DocId,
      Likes: item.Likes
    }).then(setModalVisible(true));
  };

  const increment = async (item) => {
    updateDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId), {
      Likes: item.Likes + 1
    }).catch((error) => 
      updateDoc(doc(firestore, "reviews", item.UserId, "posts", item.DocId), {
        Likes: item.Likes + 1
      }));

    updateDoc(doc(firestore, "reviews", item.UserId, "posts", item.DocId), {
      Likes: item.Likes + 1
    });
  }

  const decrement = async (item) => {
    updateDoc(doc(firestore, "saved", user.uid, "savedPosts", item.DocId), {
      Likes: item.Likes - 1
    }).catch((error) => 
    updateDoc(doc(firestore, "reviews", item.UserId, "posts", item.DocId), {
      Likes: item.Likes - 1
    }));

    updateDoc(doc(firestore, "reviews", item.UserId, "posts", item.DocId), {
      Likes: item.Likes - 1
    });
  }

  const toCollects = () => {
    navigation.navigate('CollectsScreen');
    setModalVisible(false);
  }

  const HeaderComponent = () => (
    <View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View
          style={{
            alignItems: "flex-end",
            marginBottom: 10,
            marginLeft: width * 0.7,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SearchScreen", { data: posts })
            }
          >
            <MaterialCommunityIcons
              name="magnify"
              size={50}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
      <TouchableOpacity  onPress = {() => savePost(item)} >
        <MaterialCommunityIcons name="star-outline" size={30} color={"#D39ED8"}/>
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
          offset: (height * 0.78) * index,
          index,
        })}
        style={{ marginBottom: height * 0.06 }}
        contentContainerStyle={{ alignSelf: "center" }}
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
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
              <Text style = {styles.mainText}>Item saved to your Collects!</Text>

              <TouchableOpacity onPress={toCollects} style={styles.imgUpload}>
                <Text style={styles.goBack}>To Collects</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.goBack}>
                  Back to exploring!
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
  likes: {
    fontFamily: 'Avenir', 
    alignSelf: "center", 
    fontSize: 19, 
    paddingHorizontal: 2
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
  imgUpload: {
    width: width * 0.5,
    borderRadius: 25,
    height: height * 0.05,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDC2EF",
    marginTop: height * 0.053
  },
  mainText: {
    fontSize: 20,
    fontFamily: "AbrilFatface_400Regular",
    color: "#DDC2EF",
    alignSelf: "center",
  },
  goBack: {
    fontSize: 15,
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
    height: height * 0.25,
    width: width * 0.8,
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