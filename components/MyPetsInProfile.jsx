import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import MyPetItem from "./MyPetItem";

import essentialstyles from "../styles";

const MyPetsInProfile = ({ mypets }) => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={essentialstyles.h2}>List of my pets</Text>
      <View style={styles.myPetItemContainer}>
        {!mypets ? (
          <View style={styles.gapContainer}>
            <Image
              style={styles.nopetsImg}
              source={require("../assets/data/images/nopets.png")}
            />
            <Text style={styles.nopetsText} t>
              No pets added
            </Text>
          </View>
        ) : (
          <FlatList
            data={mypets}
            keyExtractor={(item) => item.petid}
            numColumns={2}
            renderItem={({ item }) => (
              <MyPetItem item={item} navigation size={"small"} />
            )}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ gap: 10 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  petImg: {
    height: 80,
    width: 80,
  },
  nopetsImg: {
    alignSelf: "center",
    width: 80,
    height: 80,
  },

  nopetsText: {
    alignSelf: "center",
    fontSize: 22,
  },
});

export default MyPetsInProfile;
