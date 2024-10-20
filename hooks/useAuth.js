import { supabase } from "../supabase";
import { useState } from "react";
import { Alert } from "react-native";

// Хук для работы с авторизацией
export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // Функция для регистрации
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await signUpWithEmail({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  // Функция для входа
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  // Функция для выхода
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    user,
    error,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};
