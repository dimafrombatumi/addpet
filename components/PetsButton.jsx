import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import essentialstyles from "../styles";

const PetsButton = ({ buttonText }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.LostPetsContainer}>
        <View style={styles.LostPetsContainerTitle}>
          <Text style={essentialstyles.h2}>Lost pets</Text>
          <TouchableOpacity
            style={styles.seeAllTextBlock}
            onPress={function () {
              navigation.navigate("LostPetsListScreen");
            }}
          >
            <Text style={styles.seeAllText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.LostPetsContainerImgs}>
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
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  LostPetsContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
  LostPetsContainerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  LostPetsContainerImgs: {
    flexDirection: "row",
    height: 80,
  },
  lostImg: {
    borderColor: "#E9E9E9",
    borderWidth: 4,
    height: "90%",
    flex: 3,
    borderRadius: 20,
  },
  seeAllText: {
    fontSize: 15,
    color: "#1A3053",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: 10,
  },
});
export default PetsButton;
