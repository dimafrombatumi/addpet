import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { supabase } from "../supabase";
import { Ionicons } from "@expo/vector-icons";
import RemoteImage from "./RemoteImage";

import { useAllPetsStore } from "../stores/AllPetsStore";

const MyPetItem = ({ item }) => {
  const petId = item.petid;
  const deletePet = useAllPetsStore((state) => state.deletePet);

  const handleDeletePet = async (petId) => {
    await deletePet(petId);
  };

  const confirmDelete = (petId) => {
    console.log("Confirm delete called for pet ID:", petId);
    Alert.alert(
      "Deletion Confirmation",
      `Are you sure you want to delete pet ${item.petname}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeletePet(petId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.lostPetItem}
      keyExtractor={(item) => item.petid}
      onPress={() => {
        navigation.navigate("LostPetScreen", { item });
      }}
    >
      <View style={styles.itemContainer}>
        <RemoteImage
          path={item.petimgurl}
          fallback={
            "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
          }
        />
        <View style={styles.petOptions}>
          <Text style={styles.petName}>{item.petname}</Text>

          <View style={styles.petOptionsBlock}>
            <Text style={styles.petSex}>{item.petsex}</Text>

            <TouchableOpacity
              onPress={() => confirmDelete(petId)}
              style={styles.deleteIconBlock}
            >
              <Ionicons
                style={styles.deleteIcon}
                name="trash-outline"
                size={24}
                color="#F37F3B"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lostPetItem: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 10,
    borderColor: "rgba(80, 134, 231, 0.5)",
    borderWidth: 1,
  },

  petImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
  },

  petOptions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 6,
  },

  petOptionsBlock: {
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  petName: {
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  deleteIconBlock: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default MyPetItem;
