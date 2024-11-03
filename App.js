import React, { useState, useEffect } from "react";
import Navigation from "./navigation";
import { supabase } from "./supabase";
import UserContext from "./context/UserContext";
import AllPetsContext from "./context/AllPetsContext";
import MyPetsContext from "./context/MyPetsContext";
import RegisteredPetsContext from "./context/RegisteredPetsContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [registeredPets, setRegisteredPets] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allPetsData, setAllPetsData] = useState([]);

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={session}>
        <AllPetsContext.Provider value={allPetsData}>
          <RegisteredPetsContext.Provider value={registeredPets}>
            <MyPetsContext.Provider value={myPets}>
              <Navigation />
            </MyPetsContext.Provider>
          </RegisteredPetsContext.Provider>
        </AllPetsContext.Provider>
      </UserContext.Provider>
    </>
  );
}
