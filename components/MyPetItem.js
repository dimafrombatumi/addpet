import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import RemoteImage from "./RemoteImage";

import { useAllPetsStore } from "../stores/AllPetsStore";

const MyPetItem = ({ item }) => {
  const petId = item.petid;

  const deletePet = useAllPetsStore((state) => state.deletePet);
  const markAsLost = useAllPetsStore((state) => state.markAsLost);
  const markAsFound = useAllPetsStore((state) => state.markAsFound);

  const navigation = useNavigation();

  const [lost, setLost] = useState(false);

  const handleDeletePet = async (petId) => {
    await deletePet(petId);
  };

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
        { backgroundColor: item.pettype === "Cat" ? "#E8FCC1" : "#FECEB0" },
      ]}
      keyExtractor={(item) => item.petid}
      onPress={() => {
        navigation.navigate("LostPetScreen", { item });
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

          <View style={styles.petOptionsBlock}>
            {/* <TouchableOpacity
              onPress={() => confirmDelete(petId)}
              style={styles.deleteIconBlock}
            >
              <Ionicons
                style={styles.deleteIcon}
                name="trash-outline"
                size={24}
                color="#F37F3B"
              />
            </TouchableOpacity> */}

            {/* {item.islost === false ? (
              <TouchableOpacity
                onPress={() => confirmIsLost(petId)}
                style={styles.isLostIconBlock}
              >
                <Ionicons
                  style={[
                    styles.isLostIcon,
                    {
                      color: lost === false ? "#F37F3B" : "#88C273",
                    },
                  ]}
                  name="alert-circle"
                  size={24}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => confirmIsFound(petId)}
                style={styles.isFoundIconBlock}
              >
                <Ionicons
                  style={styles.isFound}
                  name="checkmark-done-circle"
                  size={24}
                  color="#88C273"
                />
              </TouchableOpacity>
            )} */}
          </View>
          <TouchableOpacity
            onPress={() => confirmEdit(petId)}
            style={styles.editIconBlock}
          >
            <View
              style={[
                styles.editPetButton,
                { borderColor: item.pettype === "Cat" ? "#c8e098" : "#C7813C" },
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
  itemContainer: {},

  lostPetItem: {
    width: "49%",
    backgroundColor: "#E8FCC1",
    borderRadius: 20,
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
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  deleteIconBlock: {
    alignItems: "flex-start",
  },
  editPetButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9ec157",
    alignItems: "center",
    marginTop: 20,
  },
});

export default MyPetItem;
