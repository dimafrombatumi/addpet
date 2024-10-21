import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { supabase } from "../supabase.js";

export const usePetActions = () => {
  const navigation = useNavigation();

  const pickImage = async (setImage, setLoading, setPetImageurl) => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   const { uri } = result.assets[0];
    //   setImage(uri);
    //   setLoading(true);
    //   try {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     const storage = getStorage();
    //     const storageRef = ref(storage, `images/${Date.now()}`);
    //     await uploadBytes(storageRef, blob);
    //     const downloadURL = await getDownloadURL(storageRef);
    //     setPetImageurl(downloadURL);
    //     console.log("Загружен Blob или файл! URL:", downloadURL);
    //   } catch (error) {
    //     console.error("Ошибка при загрузке изображения:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  };

  return { pickImage };
};
