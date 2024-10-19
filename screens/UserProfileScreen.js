import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";
import UserContext from "../context/UserContext";
import HeaderPart from "../components/HeaderPart";
import MyPetsInProfile from "../components/MyPetsInProfile";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Для обновления пароля можете сделать дополнительное поле, если нужно
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const session = useContext(UserContext);

  const useremail = session.user.email;


  return (
    <SafeAreaView>
      <View style={essentialstyles.container}>
      
        <HeaderPart />
        
        
          <View style={styles.container}>
            <Image
              source={
                
                 require("../assets/data/images/noimg.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.username}>
              { useremail || "Пользователь"}
            </Text>

          </View>

          <MyPetsInProfile />

       

        <View style={styles.formContainer}>
          {[
            {
              icon: "person-outline",
              placeholder: "Enter user name",
              value: username,
              setter: setUsername,
              secure: false,
            },
            {
              icon: "call-outline",
              placeholder: "Enter phone number",
              value: phoneNumber,
              setter: setPhoneNumber,
              keyboardType: "phone-pad",
              secure: false,
            },
          ].map(
            (
              { icon, placeholder, value, setter, keyboardType, secure },
              index
            ) => (
              <View key={index} style={essentialstyles.inputBar}>
                <Ionicons
                  style={essentialstyles.iconInput}
                  name={icon}
                  size={32}
                />
                <TextInput
                  onChangeText={setter}
                  value={value}
                  style={essentialstyles.input}
                  placeholder={placeholder}
                  keyboardType={keyboardType || "default"}
                  secureTextEntry={secure}
                />
              </View>
            )
          )}
          <Pressable
            style={essentialstyles.pressMeBtn}
          >
            <Text style={essentialstyles.pressMeText}>Update profile</Text>
          </Pressable>
        </View>
        
        {message ? <Text>{message}</Text> : null}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  username: {
    fontSize: 24,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#74C1FC",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
  petListBlock:{
    flex:1,


  }
 
});

export default ProfileScreen;
