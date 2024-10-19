import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const usePetActions = () => {

  const navigation = useNavigation();


  const pickImage = async (setImage, setLoading, setPetImageurl) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
      setLoading(true);

      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `images/${Date.now()}`);

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        setPetImageurl(downloadURL);
        console.log("Загружен Blob или файл! URL:", downloadURL);
      } catch (error) {
        console.error("Ошибка при загрузке изображения:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const addPet = async (petDetails, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3010/add-lost-pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petDetails),
      });

      const data = await response.json();
      console.log("Pet added:", data);
      alert("Pet added successfully!");
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet.");
    } finally {
      setLoading(false);
      fetchMyPets()

    }
  };

  const reportPet = async (foundPetDetails, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3010/found-pet/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foundPetDetails),
        }
      );
      const data = await response.json();
      console.log("Information sent:", data);
      Alert.alert("Information sent successfully!", "", [
        { text: "OK", onPress:()=> navigation.navigate("HomeScreen") },
      ]);
    } catch (error) {
      console.error("Information sent Error:", error);
      alert("Failed to sent information.");
    } finally {
      setLoading(false);
    }
  };


  const foundPet = async (foundPetDetails, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3010/found-pet/${foundPetDetails.petId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foundPetDetails),
        }
      );
      const data = await response.json();
      console.log("Information sent:", data);
      Alert.alert("Information sent successfully!", "", [
        { text: "OK", onPress:()=> navigation.navigate("HomeScreen") },
      ]);
    } catch (error) {
      console.error("Information sent Error:", error);
      alert("Failed to sent information.");
    } finally {
      setLoading(false);
    }
  };

  return { pickImage, addPet, foundPet, reportPet };
};
