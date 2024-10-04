import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { useNavigation } from "@react-navigation/native";
import essentialstyles from "../styles";

const LostPetScreen = ({ route }) => {
  const [copiedText, setCopiedText] = React.useState("");
  const { item } = route.params;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(item.petid);
    Alert.alert("Copied id " + item.petid);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  const callPhone = async () => {
    const phoneNumber = `tel:${item.petownerphone}`;
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert(`Не удалось открыть этот номер телефона: ${phoneNumber}`);
      }
    } catch (error) {
      console.error("Ошибка при попытке открыть номер телефона:", error);
      Alert.alert("Произошла ошибка при попытке открыть номер телефона");
    }
  };
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={essentialstyles.container}>

        <View style={styles.imageContainer}>
          {item.petimageurl ? (
            <Image style={styles.petImage} source={{ uri: item.petimageurl }} />
          ) : (
            <Image
              style={styles.petImage}
              source={require("../assets/data/images/noimg.png")}
            />
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleBlock}>
            <Text style={styles.petName}>{item.petname}</Text>
            <View style={styles.petOptions}>
              <Text>
                {item.pettype} - {item.petbreed}
              </Text>
              <Text>{item.petage} y</Text>

              {item.petsex == "Male" ? (
                <>
                  <Ionicons name="male" size={18} color="black" />
                  <Text>Male</Text>
                </>
              ) : (
                <>
                  <Text>Female</Text>

                  <Ionicons name="female-sharp" size={18} color="black" />
                </>
              )}
            </View>
            <Text style={styles.petLocation}>
              <Ionicons name="location-outline" size={18} color="red" />
              {item.petlocation}
            </Text>
          </View>
          <View style={styles.petIdBlockWrapper}>
            <View style={styles.petIdBlock}>
              <Ionicons name="qr-code-outline" size={24} color="#1A3053" />
              <Text style={styles.petIdText}> {item.petid}</Text>
            </View>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={40} color="#1A3053" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={essentialstyles.h2}>Call pet owner now</Text>
            <TouchableOpacity style={styles.petOwnerBlock} onPress={callPhone}>
              <Ionicons
                name="phone-portrait-outline"
                size={32}
                color="#1A3053"
              />
              <Text style={styles.petIdText}>{item.petownerphone}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.petDescription}>{item.petdescription}</Text>
          <TouchableOpacity
            style={styles.BottomButton}
            onPress={() => {
              navigation.navigate("ReportScreen", { lostpet: item });
            }}
          >
            <Text style={styles.pressMeText}>Report About This Pet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 360,
    justifyContent: "center",
    alignItems: "center",
  },

  petImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  titleBlock: {
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  petOptions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  petName: {
    fontSize: 26,
    marginBottom: 10,
    color: "#1A3053",
  },
  petBreed: {
    flex: 3,
    color: "#1A3053",
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
  petAge: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: "#1A3053",
    borderRadius: 10,
  },
  petLocation: {
    fontSize: 16,
    color: "#1A3053",
    marginTop: 10,
    borderRadius: 10,
  },
  petSex: {
    flex: 1,
    color: "#1A3053",
    padding: 10,
    borderRadius: 10,
  },
  petIdBlockWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  petIdBlock: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8F5FF2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
  },
  petOwnerBlock: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F8F5FF2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
  },
  petIdText: {
    fontSize: 18,
    color: "#1A3053",
  },
  petDescription: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F8F5FF",
    color: "#1A3053",
  },
  pressMeBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E8EBF1",
    borderRadius: 10,
    borderColor: "1.5px solid rgba(80, 134, 231, 0.5)",
    borderWidth: 3,
    flexDirection: "row-reverse",
  },
  pressMeText: {
    color: "#01222A",
  },

  BottomButton: {
    paddingBottom: 30,
  },
});
export default LostPetScreen;
