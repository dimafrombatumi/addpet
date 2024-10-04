import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
const HeaderPart = () => {
  const user = useContext(UserContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.appLogo}>
        <Text style={styles.appLogoText}>APP LOGO</Text>
      </View>
      <View style={styles.userAvatar}>
        <Ionicons name="person-circle-outline" size={48} color="#1A3053" />
        {/* <Text style={styles.userName}>Hi, {user.username}</Text> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appLogo: {
    flex: 2,
  },
  appLogoText: {
    fontSize: 21,
    fontWeight: "700",
  },
  appLogo: {
    flex: 3,
  },
  userAvatar: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  userName: {
    fontSize: 18,
  },
});
export default HeaderPart;
