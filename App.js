import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Navigation from "./navigation";
import UserContext from "./context/UserContext";

import RegisteredPetsContext from "./context/RegisteredPetsContext";
import MyPetsContext from "./context/MyPetsContext";
import axios from "axios";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [registeredPets, setRegisteredPets] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [isLost, setIsLost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchMyPets(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    fetchAllPets()
  }, [])

  const fetchMyPets = async (uid) => {
    try {
      const response = await axios.get(
        `http://localhost:3010/registered-pets/${uid}`
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setMyPets(sortedData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3010/lost-pets/`  // Передаем булевое значение
      );
      
      const sortedData = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      
      setRegisteredPets(sortedData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <UserContext.Provider value={user}>
        <RegisteredPetsContext.Provider value={registeredPets}>
          <MyPetsContext.Provider value={myPets}>
            <Navigation />
          </MyPetsContext.Provider>
        </RegisteredPetsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
