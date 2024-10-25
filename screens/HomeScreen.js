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
            <View style={styles.contentContainerLeft}>
              <View style={styles.reportBlock}>
                <Pressable
                  onPress={function () {
                    navigation.navigate("ReportScreen");
                  }}
                >
                  <Ionicons name="warning-outline" size={38} color="#fff" />
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
                  <Ionicons
                    name="add-circle-outline"
                    size={38}
                    color="#1A3053"
                  />
                  <Text style={styles.addPetText}>Add Pet</Text>
                  <Text style={styles.addPetDesc}>
                    Add your pet in Database
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.contentContainerRight}>
              <View style={styles.donateBlock}>
                <Pressable>
                  <View style={styles.donateBlockBottom}>
                    <Image
                      style={styles.ImageInBlock}
                      source={require("../assets/data/images/donate.jpeg")}
                    />
                  </View>
                  <View style={styles.donateBlockTop}>
                    <Ionicons
                      name="heart-circle-outline"
                      size={38}
                      color="#1A3053"
                    />
                    <Text style={styles.donateText}>Donate</Text>
                    <Text style={styles.donateDesc}>
                      Donate for homeless animals
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.container50}>
            <MyPetsInProfile mypets={mypets} />
          </View>
          <PetsButton
            targetScreen={"LostPetsListScreen"}
            buttonText={"See all lost pets"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contentContainerMain: {
    flexDirection: "row",
    gap: 15,
  },
  container50: {
    width: "100%",
    flexDirection: "column",
  },
  contentContainerLeft: {
    flexDirection: "column",
    gap: 15,
  },
  addPetButton: {
    width: "50%",
    padding: 20,
    backgroundColor: "#ccc",
  },
  reportBlock: {
    padding: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: 60,
    backgroundColor: "#FB9FFD",
    borderRadius: 10,
  },
  reportText: {
    fontSize: 18,
    fontWeight: "700",
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
    height: 60,
    width: "auto",
    backgroundColor: "#B2EAB8",
    borderRadius: 10,
  },
  addPetText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A3053",
  },
  addPetDesc: {
    fontSize: 12,
    color: "#1A3053",
  },
  contentContainerRight: {
    gap: 15,
    flex: 1,
  },
  donateBlock: {
    backgroundColor: "#B7EDF5",
    borderRadius: 10,
  },

  ImageInBlock: {
    // marginTop: 22,
    width: "100%",
    height: 90,
    borderRadius: 10,
    borderColor: "#Fff",
    borderWidth: 5,
  },

  donateBlockTop: {
    padding: 10,
  },

  donateBlockBottom: {
    minWidth: "100%",
    justifyContent: "center",
  },

  donateText: {
    fontSize: 18,
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
