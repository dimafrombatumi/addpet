import { create } from "zustand";
import { supabase } from "../supabase";

export const useAllPetsStore = create((set) => ({
  uid: null,
  allpets: [],
  mypets: [],
  fetchMyPets: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const uid = user.id;

      const { data, error } = await supabase
        .from("all_pets")
        .select("*")
        .eq("owner_id", uid);

      if (error) {
        console.error("Ошибка получения питомцев:", error.message);
      } else {
        set({ mypets: data });
      }
    } else {
      set({ mypets: [] });
      console.error("Пользователь не залогинен");
    }
  },

  fetchLostPets: async () => {
    const { data } = await supabase.from("all_pets").select("*");
    set({ allpets: data });
  },
}));
