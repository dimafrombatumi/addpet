import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LostPetItem from "../components/LostPetItem.js";
import essentialstyles from "../styles.js";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import RegisteredPetsContext from "../context/RegisteredPetsContext";
import HeaderPart from "../components/HeaderPart.jsx";
import UserContext from "../context/UserContext.js";
import PetsButton from "../components/PetsButton.jsx";
import { supabase } from "../supabase.js";
import { useAllPetsStore } from "../stores/AllPetsStore.js";

const LostPetsListScreen = () => {
  const user = useContext(UserContext);
  const fetchLostPets = useAllPetsStore((state => state.fetchLostPets))
  
  const allpets = useAllPetsStore((state) => state.pets);

  console.log(allpets);

  const navigation = useNavigation();

  const [petsTypeToFilter, setPetsTypeToFilter] = useState(null);

  // Фильтруем питомцев, у которых islost === true
  // const lostPets = allpets.filter((pet) => pet.islost);

  const filteredPets = petsTypeToFilter
    ? allpets.filter((item) => item.pettype.toUpperCase() === petsTypeToFilter)
    : allpets;

  useEffect(()=>{fetchLostPets()},[])


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <HeaderPart userName={user.displayName} />

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
            <Text style={essentialstyles.h2}>All Lost Pets</Text>

            <FlatList
              data={allpets}
              keyExtractor={(item) => item.petid}
              numColumns={2}
              renderItem={({ item }) => <LostPetItem item={item} navigation />}
              columnWrapperStyle={styles.flatListWrap}
            />
          </View>
          <View style={styles.allLostBtn}>
            <PetsButton
              petsData={allpets}
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
  pressed: {
    backgroundColor: "red",
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
    marginTop: 20,
    marginBottom: 20,
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
    marginTop: 20,
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
