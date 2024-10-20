import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LostPetItem from "../components/LostPetItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import essentialstyles from "../styles";
import SearchField from "../components/SearchField";
import AllPetsContext from "../context/AllPetsContext";
import UserContext from "../context/UserContext";
import HeaderPart from "../components/HeaderPart";

const SearchResultsScreen = ({ route }) => {
  const { searchPhrase } = route.params;
  const allpets = useContext(AllPetsContext);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(null);
  const user = useContext(UserContext);

  const filteredData = allpets.filter(
    (item) => item.petid.toUpperCase() === searchPhrase?.toUpperCase(),
  );

  return (
    <SafeAreaView>
      <View style={essentialstyles.container}>
        <HeaderPart userName={user.displayName} />
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <View style={styles.listContainer}>
          {filteredData.length === 0 ? (
            <View style={styles.searchContainer}>
              <View style={styles.searchImgContainer}>
                <Image
                  style={styles.searchImg}
                  source={require("../assets/data/images/nodata.png")}
                />
              </View>
              <Text style={styles.searchText}>No pets found</Text>
            </View>
          ) : (
            <>
              <Text style={styles.petId}>
                We found pet in our Database with chip number {searchPhrase}
              </Text>
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item.petid}
                numColumns={2}
                renderItem={({ item }) => (
                  <LostPetItem item={item} navigation />
                )}
                columnWrapperStyle={styles.flatListWrap}
              />
            </>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("LostPetsListScreen", { lostpets: allpets });
            }}
            style={essentialstyles.pressMeBtn}
          >
            <Text style={essentialstyles.pressMeText}>See All Lost Pets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListWrap: {
    marginBottom: 10,
    gap: 15,
  },

  listContainer: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },

  petId: {
    color: "#111",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
  },
  searchImgContainer: {
    marginBottom: 50,
  },
  searchImg: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  searchText: {
    fontSize: 24,
  },
});

export default SearchResultsScreen;
