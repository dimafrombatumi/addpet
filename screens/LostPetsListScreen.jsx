import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

import React, { useContext, useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import UserContext from "../context/UserContext.js";
import { useAllPetsStore } from "../stores/AllPetsStore.js";

import HeaderPart from "../components/HeaderPart.jsx";
import LostPetItem from "../components/LostPetItem.js";
import PetsButton from "../components/PetsButton.jsx";

import essentialstyles from "../styles.js";
import { COLORS } from "../constants/constants.js";

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
            <TouchableOpacity
              style={[
                styles.topItemBlock,
                {
                  backgroundColor: "#FCEFE9",
                },
              ]}
              onPress={() => setPetsTypeToFilter("CAT")}
            >
              <Text>CAT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.topItemBlock,
                {
                  backgroundColor: "#E6F8FF",
                },
              ]}
              onPress={() => setPetsTypeToFilter("DOG")}
            >
              <Text>DOG</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.topItemBlock,
                {
                  backgroundColor: COLORS.ligth_violet,
                },
              ]}
              onPress={() => setPetsTypeToFilter("")}
            >
              <Text>CAT & DOG</Text>
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

  filterContainer: {
    backgroundColor: "#fff",
    height: 90,
    flexDirection: "row",
    gap: 20,
    borderRadius: 20,
    padding: 20,
  },

  topItemBlock: {
    borderRadius: 20,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default LostPetsListScreen;
