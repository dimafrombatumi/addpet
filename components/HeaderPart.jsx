import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
const HeaderPart = ({userName}) => {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
      
      <Image
                style={styles.appLogo}
                source={require("../assets/data/images/templogo.png")}
              /> 
              <Text style={styles.appLogoText}>ADD PET</Text>
      </View>
      <View style={styles.userAvatar}>
        <Ionicons name="person-circle-outline" size={50} color="#1A3053" />
        <Text style={styles.userName}>Hi, {userName}</Text>
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
  logoContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
 
  appLogoText: {
    fontSize: 22,
    fontWeight: "500",
  },
  appLogo: {
    width:50,
    height:50
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
