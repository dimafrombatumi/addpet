import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import LostPetItem from "../components/LostPetItem.js";
import MyPetsContext from "../context/MyPetsContext.js";
import essentialstyles from "../styles.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import RegisteredPetsContext from "../context/RegisteredPetsContext";

const LostPetsListScreen = () => {
  const registeredPets = useContext(RegisteredPetsContext);

  const navigation = useNavigation();

  const [petsTypeToFilter, setPetsTypeToFilter] = useState(null);

  // Фильтруем питомцев, у которых islost === true
  const lostPets = registeredPets.filter(pet => pet.islost);

  const filteredPets = petsTypeToFilter
    ? lostPets.filter(
        (item) => item.pettype.toUpperCase() === petsTypeToFilter
      )
    : lostPets;

  return (
    <View style={essentialstyles.container}>
      <Text style={essentialstyles.h2}>All Lost Pets</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setPetsTypeToFilter("CAT")}>
          <Text style={styles.filterCategory}>🐈‍⬛ Cats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPetsTypeToFilter("DOG")}>
          <Text style={styles.filterCategory}>🐕 Dogs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPetsTypeToFilter("")}>
          <Text style={styles.filterCategory}>🐈‍⬛ + 🐕 All pets</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.petid}
          numColumns={2}
          renderItem={({ item }) => <LostPetItem item={item} navigation />}
          columnWrapperStyle={styles.flatListWrap}
        />
      </View>
      <View style={styles.allLostBtn}>
        <Pressable
          onPress={() => navigation.navigate("LostPetsListScreen", { registeredPets })}
          style={styles.pressMeBtn}
        >
          <Text style={styles.pressMeText}>See All Lost Pets</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  pressed:{
    backgroundColor:"red"
  },
  flatListWrap: {
    marginBottom: 10,
    gap: 15,
  },
  listContainer: {
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
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  filterContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 20,
  },
  filterCategory: {
    fontSize: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    
  },
  pressMeBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row-reverse",
    backgroundColor: "#E8EBF1",
    borderRadius: 10,
    borderColor: "1.5px solid rgba(80, 134, 231, 0.5)",
    borderWidth: 3,
  },
  pressMeText: {
    color: "#01222A",
  },
});

export default LostPetsListScreen;
