import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT_SIZES, RADIUS, PETTYPE } from "../constants/constants";

import RemoteImage from "./RemoteImage";

const MyPetItem = ({ item }) => {
  const petId = item.petid;
  const navigation = useNavigation();

  const handleEditPet = (item) => {
    navigation.navigate("EditPetScreen", { item });
  };

  const confirmEdit = (petId) => {
    console.log("Confirm edit called for pet ID:", petId);
    Alert.alert(
      "Edition Confirmation",
      `Are you sure you want to Edit pet ${item.petname}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: () => handleEditPet(item),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable
      style={[
        styles.lostPetItem,
        {
          backgroundColor: item.pettype === PETTYPE.cat ? "#E8FCC1" : "#FECEB0",
        },
      ]}
      keyExtractor={(item) => item.petid}
      onPress={() => {
        navigation.navigate("MyPetScreen", { item });
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <RemoteImage
            size={"mikro"}
            style={{ height: 30, width: 30 }}
            path={item.petimgurl}
            fallback={
              "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
            }
          />
        </View>
        <View style={styles.petOptions}>
          <Text style={styles.petName}>{item.petname}</Text>

          <View style={styles.petOptionsBlock}></View>
          <TouchableOpacity
            onPress={() => confirmEdit(petId)}
            style={styles.editIconBlock}
          >
            <View
              style={[
                styles.editPetButton,
                {
                  borderColor:
                    item.pettype === PETTYPE.cat
                      ? COLORS.border_green
                      : COLORS.border_brown,
                },
              ]}
            >
              <Text>Edit pet</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lostPetItem: {
    width: "49%",
    backgroundColor: COLORS.ligth_green,
    borderRadius: RADIUS.default,
    padding: 10,
  },

  petOptions: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
  },

  petOptionsBlock: {
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  petName: {
    color: COLORS.black,
    fontSize: FONT_SIZES.large,
    fontWeight: "700",
  },

  editPetButton: {
    padding: 10,
    borderRadius: RADIUS.default,
    borderWidth: 1,
    borderColor: COLORS.border_green,
    alignItems: "center",
    marginTop: 20,
  },
});

export default MyPetItem;
