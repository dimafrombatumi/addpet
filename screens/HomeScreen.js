import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import HeaderPart from "../components/HeaderPart";
import LostPetsList from "../components/LostPetsList";
import { useNavigation } from "@react-navigation/native";
import essentialstyles from "../styles";
import UserContext from "../context/UserContext";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const navigation = useNavigation();

  const user = useContext(UserContext);

  return (
    <ScrollView>
      <View style={essentialstyles.container}>
        <HeaderPart />
        <View style={styles.searchBar}>

          <TextInput
            onChangeText={setSearchQuery}
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

        <View style={styles.contentContainerMain}>
          <View style={styles.reportBlock}>
            <Pressable
              onPress={function () {
                navigation.navigate("ReportScreen");
              }}
            >
              <Ionicons name="warning-outline" size={48} color="#fff" />
              <Text style={styles.reportText}>Report</Text>
              <Text style={styles.reportDesc}>Report Lost animal</Text>
            </Pressable>
          </View>
          <View style={styles.addpetBlock}>
            <Pressable
              onPress={function () {
                navigation.navigate("AddPetScreen");
              }}
            >
              <Ionicons name="add-circle-outline" size={48} color="#1A3053" />
              <Text style={styles.addPetText}>Add Pet</Text>
              <Text style={styles.addPetDesc}>
                First Aid For injured Animal
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.secContentContainer}>
          <View style={styles.donateBlock}>
            <Pressable>
              <Ionicons name="heart-circle-outline" size={48} color="#1A3053" />
              <Text style={styles.donateText}>Donate</Text>
              <Text style={styles.donateDesc}>Donate for homeless animals</Text>
            </Pressable>
          </View>
          <View style={styles.volunteersBlock}>
            <Pressable>
              <Ionicons name="play-circle-outline" size={48} color="#1A3053" />
              <Text style={styles.volunteersText}>Volunteers</Text>
              <Text style={styles.volunteersDesc}>Find Volunteers</Text>
            </Pressable>
          </View>
        </View>
        <LostPetsList num="4" />
      </View>
    </ScrollView>
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
    fontSize: 20,
  },
  contentContainerMain: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
  },
  reportBlock: {
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: 130,
    backgroundColor: "#FE8787",
    borderRadius: 10,
  },
  reportText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#fff",
  },
  reportDesc: {
    fontSize: 12,
    color: "#fff",
  },
  addpetBlock: {
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: 130,
    width: "auto",
    backgroundColor: "#FFD43B",
    borderRadius: 10,
  },
  addPetText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1A3053",
  },
  addPetDesc: {
    fontSize: 12,
    color: "#1A3053",
  },
  secContentContainer: {
    flexDirection: "row",
    gap: 15,
  },
  donateBlock: {
    padding: 10,
    paddingHorizontal: 10,
    flex: 3,
    height: 130,
    width: "auto",
    backgroundColor: "#64E7BF",
    borderRadius: 10,
  },
  volunteersBlock: {
    padding: 10,
    paddingHorizontal: 10,
    flex: 2,
    height: 130,
    width: "auto",
    backgroundColor: "#74C1FC",
    borderRadius: 10,
  },
  donateText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1A3053",
  },
  donateDesc: {
    fontSize: 12,
    color: "#1A3053",
  },
  volunteersText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1A3053",
  },

  volunteersDesc: {
    fontSize: 12,
    color: "#1A3053",
  },
});
export default HomeScreen;
