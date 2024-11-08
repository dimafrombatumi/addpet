import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RemoteImage from "../components/RemoteImage";

const LostPetItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.lostPetItem}
      keyExtractor={(item) => item.petid}
      onPress={() => navigation.navigate("LostPetScreen", { item })}
    >
      <View>
        <RemoteImage
          path={item.petimgurl}
          fallback={
            "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
          }
          size={"small"}
          style={styles.petImage}
        />
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
    maxWidth: "50%",
    backgroundColor: "#Fff",
    padding: 10,
    borderRadius: 20,
    borderColor: "rgba(80, 134, 231, 0.5)",
    borderWidth: 1,
  },

  petImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
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
