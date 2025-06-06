import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import essentialstyles from "../styles";

const SearchField = ({ searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();

  const handleSetSearchQuery = (text) => {
    setSearchQuery(text);
  };
  return (
    <View style={styles.searchBarContainer}>
      <Text style={essentialstyles.h2}>Search by ID</Text>

      <View style={styles.searchBar}>
        <TextInput
          onChangeText={handleSetSearchQuery}
          value={searchQuery}
          style={styles.searchInput}
          keyboardType="numeric"
          placeholder="enter pet microchip ID number"
        />
        <Pressable
          onPress={function () {
            navigation.navigate("SearchResultsScreen", {
              searchPhrase: searchQuery,
            });
          }}
        >
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={24}
            color="#1A3053"
          />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  searchBar: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
});
export default SearchField;
