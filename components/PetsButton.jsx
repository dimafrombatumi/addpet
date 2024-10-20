import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import essentialstyles from "../styles";

const PetsButton = ({ petsData, targetScreen, buttonText }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={essentialstyles.pressMeBtn}
      onPress={function () {
        navigation.navigate(targetScreen, {
          petsData: petsData,
        });
      }}
    >
      <Text style={essentialstyles.pressMeText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});
export default PetsButton;
