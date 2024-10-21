import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchField = ({ searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();

  const handleSetSearchQuery = (text) => {
    setSearchQuery(text);
  };
  return (
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
  );
};
const styles = StyleSheet.create({
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
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 22,
  },
});
export default SearchField;
