import { create } from "zustand";
import { supabase } from "../supabase";


export const useAllPetsStore = create((set) => ({
  pets: [],
  uid: null,

  fetchSession: async () => { 
    const { data } = await supabase.auth.getSession()
    set({uid: data.session.user.id});
  },
  fetchLostPets: async () => {
    const { data } = await supabase.from("all_pets").select("*");
    set({ pets: data });
  },
  fetchMyPets: async () => {
    const { data } = await supabase.from("all_pets").select("*").eq('owner_id', 'ea45b9f5-de4c-4f92-a7c4-b8d708cee15f');
    set({ pets: data });
  },
}));
