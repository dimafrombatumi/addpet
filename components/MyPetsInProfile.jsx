import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import MyPetItem from "./MyPetItem";
import { Ionicons } from "@expo/vector-icons";

import essentialstyles from "../styles";

const MyPetsInProfile = ({ mypets }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.myPetsBlock}>
      <View style={styles.myPetsTopBlock}>
        <Text style={essentialstyles.h2}>My pets</Text>
        <View style={styles.myPetsTopRightBlock}>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("AddPetScreen");
            }}
          >
            <Ionicons style={styles.addPetIcon} name="add-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("UserProfileScreen");
            }}
          >
            <Text style={styles.seeAllPetsButton}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.myPetItemContainer}>
        {!mypets ? (
          <View style={styles.gapContainer}>
            <Image
              style={styles.nopetsImg}
              source={require("../assets/data/images/nopets.png")}
            />
            <Text style={styles.nopetsText} t>
              No pets added
            </Text>
          </View>
        ) : (
          <FlatList
            data={mypets}
            keyExtractor={(item) => item.petid}
            numColumns={2}
            renderItem={({ item }) => <MyPetItem item={item} size={"small"} />}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 8 }}
            contentContainerStyle={{ gap: 8 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myPetsBlock: {
    marginVertical: 15,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 20,
  },
  myPetsTopBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginVertical: 10,
  },

  myPetsTopRightBlock: {
    flexDirection: "row",
    gap: 20,
  },

  nopetsImg: {
    alignSelf: "center",
    width: 20,
    height: 20,
  },

  nopetsText: {
    alignSelf: "center",
    fontSize: 22,
  },

  seeAllPetsButton: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },

  addPetIcon: {
    flex: 3,
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
});

export default MyPetsInProfile;
