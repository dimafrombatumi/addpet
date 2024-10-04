import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import LostPetsContext from "../context/MyPetsContext";
import LostPetItem from "../components/LostPetItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import essentialstyles from "../styles";

const SearchResultsScreen = ({ route }) => {
  const { searchPhrase } = route.params;
  const lostpets = useContext(LostPetsContext);
  const navigation = useNavigation();

  const filteredData = lostpets.filter(
    (item) => item.petid.toUpperCase() === searchPhrase.toUpperCase()
  );

  return (
    <View style={essentialstyles.container}>
      <Text style={essentialstyles.h2}>All Lost Pets</Text>
      <View style={styles.listContainer}>
        {filteredData == "" && <Text>No data</Text>}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.petid}
          numColumns={2}
          renderItem={({ item }) => <LostPetItem item={item} navigation />}
          columnWrapperStyle={styles.flatListWrap}
        />
      </View>
      <View style={styles.allLostBtn}>
        <TouchableOpacity
          onPress={function () {
            navigation.navigate("LostPetsListScreen", { lostpets: lostpets });
          }}
          style={styles.pressMeBtn}
        >
          <Text style={essentialstyles.pressMeText}>See All Lost Pets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListWrap: {
    marginBottom: 10,
    gap: 15,
    paddingHorizontal: 15,
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
});

export default SearchResultsScreen;
