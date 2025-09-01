// stores/perfil.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/interfaces/user.type";

interface PerfilState {
  perfil: User | null;
  setPerfil: (perfil: User) => void;
  clearPerfil: () => void;
}

export const usePerfilStore = create<PerfilState>()(
  persist(
    (set) => ({
      perfil: null,
      setPerfil: (perfil) => set({ perfil }),
      clearPerfil: () => set({ perfil: null }),
    }),
    {
      name: "perfil-storage",
    }
  )
);
