import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LostPetItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.lostPetItem}
      keyExtractor={(item) => item.petid}
      onPress={function () {
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
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lostPetItem: {
    flex: 1,
    width: "45%",
    maxWidth: "100%",
    backgroundColor: "#Fff",
    padding: 5,
    borderRadius: 10,
    borderColor: "rgba(80, 134, 231, 0.5)",
    borderWidth: 1,
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
});
export default LostPetItem;
