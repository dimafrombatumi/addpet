import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const MyPetItem = ({ item }) => {
  const petId = item.petid;

  const handleDeletePet = async (petId) => {
    try {
      const response = await fetch(
        `http://localhost:3010/delete-pet/${petId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error when deleting a pet");
      }

      Alert.alert("Success”, ”Pet successfully deleted");
      // Тут можно обновить локальное состояние или сделать запрос на обновление списка
    } catch (error) {
      console.error("Error when deleting a pet:", error);
      Alert.alert("Error", "Failed to delete pet");
    }
  };

  const confirmDelete = (petId) => {
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
      { cancelable: true } //
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
      <View>
        {!item.petimgurl && (
          <Image
            style={styles.petImage}
            source={require("../assets/data/images/noimg.png")}
          />
        )}
        {item.petimgurl && (
          <Image style={styles.petImage} source={{ uri: item.petimgurl }} />
        )}
        <View style={styles.petOptions}>
          <Text style={styles.petName}>{item.petname}</Text>

          <View style={styles.petOptionsBlock}>
            <Text style={styles.petSex}>{item.petsex}</Text>
            <Text style={styles.petCity}>
              <Ionicons name="location-outline" size={14} color="#F37F3B" />
              {item.petlocation}
            </Text>
            <TouchableOpacity
              onPress={() => confirmDelete(petId)}
              style={styles.deleteIconBlock}
            >
              <Ionicons
                style={styles.deleteIcon}
                name="trash-outline"
                size={28}
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
    backgroundColor: "#Fff",
    padding: 5,
    borderRadius: 10,
    borderColor: "rgba(80, 134, 231, 0.5)",
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },

  petImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },

  petOptions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 6,
  },

  petOptionsBlock: {
    marginTop: 7,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  petName: {
    color: "#111",
    fontSize: 19,
    fontWeight: "700",
  },
  deleteIconBlock: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default MyPetItem;
