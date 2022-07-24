import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
  Interaction,
  InteractionText,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { getAuth } from "firebase/auth";
import { ref, listAll, getDownloadURL, getStorage } from "@firebase/storage";
import {
  doc,
  getDocs,
  getFirestore,
  collectionGroup,
} from "firebase/firestore";
import { v4 } from "uuid";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.45;
const imageH = height * 0.25;

export default function SavePost({ navigation }) {
  //   const uri = props.route.params.image;
  //   const childPath =
  //     "reviews/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}";
  //   console.log(childPath);
  //   const uploadImage = async () => {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const task = firebase.storage().ref().child(childPath).put(blob);
  //     const taskProgress = (snapshot) => {
  //       console.log("transferred: ${snapshot.bytesTransferred}");
  //     };
  //     const taskCompleted = () => {
  //       task.snapshot.ref.getDownloadURL().then((snapshot) => {
  //         console.log(snapshot);
  //       });
  //     };
  //     const taskError = (snapshot) => {
  //       console.log(snapshot);
  //     };
  //     task.on("state_changed", taskProgress, taskError, taskCompleted);
  //   };
  //   return (
  //     <View>
  //       <Image source={{ uri: props.route.params.image }} />

  //       <Button title="save" onPress={() => uploadImage()} />

  //       <TouchableOpacity onPress={uploadImage}>
  //         <MaterialCommunityIcons
  //           name="image-outline"
  //           color={"#DDC2EF"}
  //           size={height * 0.06}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();
  const storage = getStorage();
  const storageRef = ref(storage, "save/" + user.uid + "/" + v4());

  const [isFetching, setIsFetching] = useState(false);
  const [saveList, setSaveList] = useState([]);
  const saveListRef = ref(storage, "save/" + user.uid + "/");

  const loadItems = () => {
    listAll(saveListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setSaveList((prev) => [...prev, url]);
          setIsFetching(false);
        });
      });
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onRefresh = async () => {
    setIsFetching(true);
    setSaveList([]);
    loadItems();
  };

  const HeaderComponent = () => (
    <View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={styles.header}>Collects.</Text>
        <View
          style={{
            alignItems: "flex-end",
            marginBottom: 10,
            marginLeft: width * 0.2,
            flexDirection: "row",
          }}
        ></View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.background}>
      <FlatList
        data={saveList}
        onRefresh={onRefresh}
        numColumns={2}
        refreshing={isFetching}
        style={{ marginBottom: height * 0.06 }}
        contentContainerStyle={{ alignSelf: "center" }}
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                initialScroll: index,
                data: postList,
              })
            }
          >
            <Image
              source={{ uri: item.Image }}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={styles.title}>{item.Title}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 60,
    backgroundColor: "#00000000",
  },
  image: {
    // width: width * 0.9,
    // height: width * 0.9,
    // resizeMode: "cover",
    // borderRadius: 10,
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  card: {
    width: width * 0.5,
    height: height * 0.3,
    backgroundColor: "#00000000",
    marginBottom: width * 0.05,
    alignItems: "center",
    // borderRadius: 10,
    // backgroundColor: "white"
  },

  title: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 15,
    color: "black",
    shadowRadius: 3,
    marginHorizontal: width * 0.01,
    alignSelf: "flex-start",
  },
});
