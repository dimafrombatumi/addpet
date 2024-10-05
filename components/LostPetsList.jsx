import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import LostPetItem from "./LostPetItem";
import RegisteredPetsContext from "../context/RegisteredPetsContext"
import MyPetsContext from "../context/MyPetsContext";

const LostPetsList = () => {
  const myPets = useContext(MyPetsContext);
  const registeredPets = useContext(RegisteredPetsContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>My Pets</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={myPets}
          keyExtractor={(item) => item.petid}
          numColumns={2}
          renderItem={({ item }) => <LostPetItem item={item} navigation />}
          columnWrapperStyle={styles.flatListWrap}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={function () {
            navigation.navigate("LostPetsListScreen", {
              registeredPets: registeredPets,
            });
          }}
        
        >
          <Text style={styles.lostPetsText}>See All Lost Pets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    marginBottom:20
  },
  flatListWrap: {
    marginBottom: 10,
    gap: 15,
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
  },
  lostPetItem: {
    flex: 1,
    width: "45%",
    maxWidth: "100%",
    backgroundColor: "#Fff",
    padding: 5,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },

  petImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },

  petOptions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 6,
  },
  petId: {
    color: "#1A3053",
    fontSize: 18,
    fontWeight: "700",
  },
  lostPetsBlock: {
  padding: 10,
  paddingHorizontal: 10,
  height: 130,
  backgroundColor: "#ссс",
  borderRadius: 10,
  marginTop:10,
  },
  lostPetsText: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    color: "#111",
    },
  h2: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1A3053",
  },
});
export default LostPetsList;
