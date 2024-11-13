import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Avatar from "./Avatar";

import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { useAllPetsStore } from "../stores/AllPetsStore";
import { Ionicons } from "@expo/vector-icons";

const HeaderPart = () => {
  const session = useContext(UserContext);
  const navigation = useNavigation();
  const user = useAllPetsStore((state) => state.user);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerRight}>
        <Avatar style={styles.userAvatar} avatarImg={user?.avatar_url} />

        <View style={styles.userTitle}>
          <Text style={styles.userName}>Hi, {user.username} 👋</Text>
          <Text style={styles.userLocation}>Batumi, Georgia</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={function () {
            navigation.navigate("UserProfileScreen", { session: session });
          }}
        >
          <Ionicons
            style={styles.editProfileIcon}
            name="create-outline"
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    gap: 20,
    marginTop: 40,
  },

  headerContainerRight: {
    flexDirection: "row",
    gap: 20,
  },

  userAvatar: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },

  userTitle: {
    gap: 10,
    marginTop: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A3053",
  },

  userLocation: {
    fontSize: 14,
    color: "#F6821F",
  },
  editProfileIcon: {
    color: "#111",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: 10,
  },
});
export default HeaderPart;
