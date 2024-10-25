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
          style={styles.lostImg}
          source={require("../assets/data/images/lost1.png")}
        />
        <Image
          style={styles.lostImg}
          source={require("../assets/data/images/lost2.png")}
        />
        <Image
          style={styles.lostImg}
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
    flex: 1,
    flexDirection: "row",
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B2EAB8",
    borderRadius: 10,
    marginBottom: 20,
  },
  lostImg: {
    height: "100%",
    flex: 3,
  },
  seeAllTextBlock: {
    flex: 3,
    height: "100%",
    justifyContent: "center",
    padding: 8,
  },
  seeAllText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#1A3053",
  },
});
export default PetsButton;
