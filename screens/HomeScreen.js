import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import HeaderPart from "../components/HeaderPart";
import SearchField from "../components/SearchField";
import MyPetsInProfile from "../components/MyPetsInProfile";
import PetsButton from "../components/PetsButton";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import essentialstyles from "../styles";
import { useAllPetsStore } from "../stores/AllPetsStore";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const navigation = useNavigation();
  const mypets = useAllPetsStore((state) => state.mypets);
  const fetchMyPets = useAllPetsStore((state) => state.fetchMyPets);

  useEffect(() => {
    fetchMyPets();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <HeaderPart />
          <SearchField
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <View style={styles.contentContainerMain}>
            <View style={styles.topItemBlock}>
              <Pressable
                style={styles.topItemBlockPress}
                onPress={function () {
                  navigation.navigate("ReportScreen");
                }}
              >
                <Ionicons name="alert-circle" size={45} color="#EC6837" />
                <Text style={styles.reportText}>Report</Text>
              </Pressable>
            </View>
            <View style={[styles.topItemBlock, { backgroundColor: "#E6F8FF" }]}>
              <Pressable
                style={styles.topItemBlockPress}
                onPress={function () {
                  navigation.navigate("ReportScreen");
                }}
              >
                <Ionicons name="heart-circle" size={45} color="#255779" />
                <Text style={styles.reportText}>Donate</Text>
              </Pressable>
            </View>
            <View style={[styles.topItemBlock, { backgroundColor: "#EEEFFE" }]}>
              <Pressable
                style={styles.topItemBlockPress}
                onPress={function () {
                  navigation.navigate("ReportScreen");
                }}
              >
                <Ionicons name="compass" size={45} color="#393B62" />
                <Text style={styles.reportText}>Veterinars</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.container50}>
            <MyPetsInProfile mypets={mypets} />
          </View>
          <PetsButton
            targetScreen={"LostPetsListScreen"}
            buttonText={"See all"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contentContainerMain: {
    height: 80,
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    flex: 1,
    gap: 10,
  },

  topItemBlock: {
    backgroundColor: "#FCEFE9",
    borderRadius: 20,
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  topItemBlockPress: {
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainerRight: {
    gap: 15,
    flex: 1,
  },

  donateBlockBottom: {
    minWidth: "100%",
    justifyContent: "center",
  },
});
export default HomeScreen;
