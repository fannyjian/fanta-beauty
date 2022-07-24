import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { RefreshControl } from "react-native";
import SavePost from "./savePost";

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const LogoutButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.logoutButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [url, setUrl] = useState();
  const [name, setName] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setName(user.displayName);
    const func = async () => {
      const storage = getStorage();
      const profileRef = ref(storage, "profile/" + user.uid);
      const defaultRef = ref(storage, "profile/default-profile.jpg");

      await getDownloadURL(profileRef)
        .then((result) => {
          setUrl(result);
        })
        .catch((error) => {
          getDownloadURL(defaultRef).then((result) => {
            setUrl(result);
          });
        });
    };
    func();
    setRefreshing(false);
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const signOut = () => auth.signOut();

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style={globalStyles.header}>Profile.</Text>

      <ScrollView
        contentContainerStyle={globalStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.image}>
          <Avatar source={{ uri: url }} size={width * 0.45} rounded={true}>
            <Avatar.Accessory
              size={width * 0.1}
              onPress={() => navigation.navigate("EditProfileScreen")}
            />
          </Avatar>
        </View>

        <Text style={styles.name}>{name}</Text>

        <View style={styles.screenContainer}>
          <AppButton
            title="Collects"
            backgroundColor="#007bff"
            onPress={() => navigation.navigate("SavePost")}
          />
        </View>

        <View style={styles.screenContainer}>
          <AppButton
            title="Posts"
            backgroundColor="#007bff"
            onPress={() => navigation.navigate("CollectsScreen")}
          />
        </View>

        <View style={styles.logoutButton}>
          <LogoutButton
            title="log out."
            backgroundColor="#007bff"
            onPress={signOut}
          />
        </View>

        <View style={{ margin: 200 }}>
          <Text>hi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    marginBottom: -10,
    fontSize: 20,
    fontFamily: "AbrilFatface_400Regular",
    color: "black",
    borderBottomWidth: 25,
  },
  screenContainer: {
    padding: height * 0.01,
  },
  appButtonContainer: {
    width: width * 0.75,
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: height * 0.014,
  },
  appButtonText: {
    fontSize: 25,
    fontFamily: "AbrilFatface_400Regular",
    color: "black",
    alignSelf: "center",
  },
  logoutButtonText: {
    fontSize: 20,
    fontFamily: "AbrilFatface_400Regular",
    color: "#DDC2EF",
    alignSelf: "center",
  },
  logoutButton: {
    marginTop: 130,
    color: "grey",
    fontFamily: "Avenir",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
