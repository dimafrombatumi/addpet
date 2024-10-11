
import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderPart = ({userName}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
      
      <Image
            style={styles.appLogo}
            source={require("../assets/data/images/templogo.png")}
              /> 
              <Text style={styles.appLogoText}>ADD PET</Text>
      </View>
      <TouchableOpacity onPress={function () {
        navigation.navigate("UserProfileScreen", {userName});
      }}>
      <View style={styles.userAvatar}>
        <Ionicons name="person-circle-outline" size={50} color="#1A3053" />
        <Text style={styles.userName}>Hi, {userName}</Text>
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
    marginBottom:10
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
