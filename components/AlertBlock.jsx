import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const AlertBlock = () => {
  return (
    <View style={styles.alertContainer}>
      <Ionicons name="checkmark-circle" size={32} color="#FE8787" />
      <Text style={styles.alertText}>Someone found yopur pet! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    height: 60,
    padding: 10,
    borderWidth: 3,
    borderColor: "#FE8787",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },

  alertText: {
    fontSize: 19,
    color: "#1A3053",
  },
});
export default AlertBlock;
