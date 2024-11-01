import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import essentialstyles from "../styles";

const PetsButton = ({ buttonText }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={essentialstyles.h2}>Lost pets</Text>

      <View style={styles.LostPetsContainer}>
        <Image
          style={[styles.lostImg, { borderColor: "#EEEFFE" }]}
          source={require("../assets/data/images/lost1.png")}
        />
        <Image
          style={[styles.lostImg, { borderColor: "#fcefe9" }]}
          source={require("../assets/data/images/lost2.png")}
        />
        <Image
          style={[styles.lostImg, { borderColor: "#E6F8FF" }]}
          source={require("../assets/data/images/lost3.png")}
        />
        <TouchableOpacity
          onPress={function () {
            navigation.navigate("LostPetsListScreen");
          }}
          style={styles.seeAllTextBlock}
        >
          <Text style={styles.seeAllText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  LostPetsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    gap: 5,
    height: 110,
  },
  lostImg: {
    borderColor: "#E9E9E9",
    borderWidth: 4,
    height: "90%",
    flex: 3,
    borderRadius: 20,
  },
  seeAllTextBlock: {
    flex: 3,
    height: "100%",
    justifyContent: "flex-start",
    padding: 8,
  },
  seeAllText: {
    fontSize: 15,
    color: "#1A3053",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: 10,
    alignSelf: "center",
  },
});
export default PetsButton;
