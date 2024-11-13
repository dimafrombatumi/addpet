import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";
import { RADIUS } from "../constants/constants";

export default function Avatar({ avatarImg, uploadLocal }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (uploadLocal) {
      setImage(uploadLocal);
      return;
    }
    if (!avatarImg) return;

    (async () => {
      const { data, error } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarImg);

      if (error) {
        Alert.alert("Ошибка загрузки аватара", error.message);
        console.log(error);
        return;
      }
      if (data) {
        setImage(data.publicUrl);
      }
    })();
  }, [avatarImg, uploadLocal]);

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.avatar} />
      ) : (
        <Image source={{ uri: uploadLocal }} style={styles.avatar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.default,
  },
});
