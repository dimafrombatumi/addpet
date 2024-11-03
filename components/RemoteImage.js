import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

import { supabase } from "../supabase";

const RemoteImage = ({ path, fallback, size }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage("");
      const { data, error } = await supabase.storage
        .from("assets")
        .download(path);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return size === "mikro" ? (
    <Image style={styles.petImageMk} source={{ uri: image || fallback }} />
  ) : (
    <Image
      style={[size === "large" ? styles.petImageLg : styles.petImageSm]}
      source={{ uri: image || fallback }}
    />
  );
};

const styles = StyleSheet.create({
  petImageMk: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  petImageSm: {
    minHeight: 140,
    width: "100%",
    borderRadius: 20,
  },
  petImageLg: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
});
export default RemoteImage;
