import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collectionGroup } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

export default function Search({ route }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();

  const [masterData, setMasterData] = useState(route.params.data);
  const [filteredData, setFilteredData] = useState(route.params.data);
  const [search, setSearch] = useState("");

  const searchFunction = (query) => {
    if (query) {
      const newData = masterData.filter((item) => {
        const titleData = item.Title
          ? item.Title.toUpperCase()
          : "".toUpperCase();
        const catData = item.Category
          ? item.Category.toUpperCase()
          : "".toUpperCase();
        const textData = query.toUpperCase();
        return (
          titleData.indexOf(textData) > -1 || catData.indexOf(textData) > -1
        );
      });
      setFilteredData(newData);
      setSearch(query);
    } else {
      setFilteredData(masterData);
      setSearch(query);
    }
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <Searchbar
        placeholder="searching for something?"
        inputStyle={{ fontFamily: "Avenir" }}
        style={{ width: width * 0.93, alignSelf: "center", margin: 20 }}
        onChangeText={(query) => searchFunction(query)}
        value={search}
      />

      <FlatList
        data={filteredData}
        style={{ marginBottom: height * 0.06 }}
        contentContainerStyle={{ alignSelf: "center" }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={{ uri: item.Image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.text}>{item.Review}</Text>
          </TouchableOpacity>
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
  image: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "cover",
    borderRadius: 10,
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#00000000",
    marginBottom: width * 0.05,
    alignItems: "center",
    // borderRadius: 10,
    // backgroundColor: "white"
  },
  text: {
    marginTop: width * 0.02,
    marginHorizontal: width * 0.01,
    fontFamily: "Avenir",
    fontSize: 15,
    alignSelf: "flex-start",
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
});
