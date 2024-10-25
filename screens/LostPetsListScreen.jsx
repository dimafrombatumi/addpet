import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

import React, { useContext, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import UserContext from "../context/UserContext.js";
import { useAllPetsStore } from "../stores/AllPetsStore.js";

import HeaderPart from "../components/HeaderPart.jsx";
import LostPetItem from "../components/LostPetItem.js";
import PetsButton from "../components/PetsButton.jsx";

import essentialstyles from "../styles.js";

const LostPetsListScreen = () => {
  const [petsTypeToFilter, setPetsTypeToFilter] = useState(null);
  const user = useContext(UserContext);
  const fetchLostPets = useAllPetsStore((state) => state.fetchLostPets);
  const allpets = useAllPetsStore((state) => state.allpets);
  const lostPets = allpets.filter((pet) => pet.islost);

  useEffect(() => {
    fetchLostPets();
  }, []);

  const filteredPets = petsTypeToFilter
    ? lostPets.filter((item) => item.pettype.toUpperCase() === petsTypeToFilter)
    : lostPets;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <HeaderPart userName={user.displayName} />
          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={() => setPetsTypeToFilter("CAT")}>
              <Text
                style={[
                  styles.filterCategory,
                  {
                    backgroundColor:
                      petsTypeToFilter === "CAT" ? "#C9E9D2" : "#fff",
                  },
                ]}
              >
                🐈‍⬛ Cats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPetsTypeToFilter("DOG")}>
              <Text
                style={[
                  styles.filterCategory,
                  {
                    backgroundColor:
                      petsTypeToFilter === "DOG" ? "#C9E9D2" : "#fff",
                  },
                ]}
              >
                🐕 Dogs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPetsTypeToFilter("")}>
              <Text
                style={[
                  styles.filterCategory,
                  {
                    backgroundColor:
                      petsTypeToFilter === "" ? "#C9E9D2" : "#fff",
                  },
                ]}
              >
                🐈‍⬛ + 🐕 All pets
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <Text style={essentialstyles.h2}>All Lost Pets</Text>

            <FlatList
              data={filteredPets}
              keyExtractor={(item) => item.petid}
              numColumns={2}
              renderItem={({ item }) => <LostPetItem item={item} navigation />}
              columnWrapperStyle={{ gap: 10 }}
              contentContainerStyle={{ gap: 10 }}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.allLostBtn}>
            <PetsButton
              petsData={filteredPets}
              targetScreen={"LostPetsListScreen"}
              buttonText={"See all lost pets"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    padding: 5,
  },
  petId: {
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
  },
  filterContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  filterCategory: {
    fontSize: 18,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default LostPetsListScreen;
