import { StyleSheet, Text, Pressable, Alert } from "react-native";
import React from "react";

const Button = () => {
  return (
    <>
      <Pressable
        onPress={() => {
          Alert.alert("Sent");
        }}
        style={styles.pressMeBtn}
      >
        <Text style={styles.pressMeText}>Report About This Pet</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  pressMeBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0285A6",
    flexDirection: "row-reverse",
  },
  pressMeText: {
    color: "white",
  },
});
export default Button;
