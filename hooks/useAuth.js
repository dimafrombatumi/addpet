import { storage } from "../firebaseConfig"; // Инициализация Firebase Storage
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebaseConfig"; // Инициализация Firebase Auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useAuth = () => {
  const user = useContext(UserContext);

  const register = async ({ email, password, name, avatar }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      let avatarUrl = "";
      if (avatar) {
        const response = await fetch(avatar);
        const blob = await response.blob();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, blob);
        avatarUrl = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl,
      });

      // Здесь вы можете отправить дополнительные данные на свой сервер, если необходимо

      setUser(user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return { register };
};
