import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

const HeaderPart = () => {
  const session = useContext(UserContext);
  const navigation = useNavigation();
  const useremail = session?.user.email;
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={function () {
          navigation.navigate("HomeScreen");
        }}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.appLogo}
            source={require("../assets/data/images/templogo.png")}
          />
          <Text style={styles.appLogoText}>ADD PET</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={function () {
          navigation.navigate("UserProfileScreen");
        }}
      >
        <View style={styles.userAvatar}>
          <Image
            style={styles.appLogo}
            source={require("../assets/data/images/ava.jpg")}
          />
          {/* <Ionicons name="person-circle-outline" size={50} color="#1A3053" /> */}
          <Text style={styles.userName}>Hi, John 👋</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  appLogoText: {
    fontSize: 22,
    fontWeight: "500",
  },
  appLogo: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  userAvatar: {
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  userName: {
    fontSize: 18,
  },
});
export default HeaderPart;
