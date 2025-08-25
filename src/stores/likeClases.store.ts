// stores/likeClasesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getLikeClases,
  postLikeClases,
  deleteLikeClases,
} from "@/services/likesClases.service";
import { useEffect, useCallback } from "react";

// Tipos
interface LikeClase {
  id: number;
  usuario_id: string;
  clase_id: number;
  createdAt: string;
  updatedAt: string;
}

interface LikeClasesState {
  // Estado
  likeClases: LikeClase[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;

  // Getters computados (funciones seguras)
  likeClasesCount: () => number;
  likedClassIds: () => Set<number>;
  isClassLiked: (claseId: number) => boolean;

  // Acciones
  setLikeClases: (likeClases: LikeClase[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Acciones principales
  fetchLikeClases: () => Promise<void>;
  addLikeClase: (claseId: number) => Promise<void>;
  removeLikeClase: (claseId: number) => Promise<void>;
  clearLikeClases: () => void;
}

const useLikeClasesStore = create<LikeClasesState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      likeClases: [],
      isLoading: false,
      error: null,
      lastUpdated: null,

      // ✅ Getters seguros como funciones
      likeClasesCount: () => (get().likeClases ?? []).length,

      likedClassIds: () => {
        const { likeClases } = get();
        return new Set((likeClases ?? []).map((like) => like.clase_id));
      },

      isClassLiked: (claseId: number) => {
        return get().likedClassIds().has(claseId);
      },

      // Acciones básicas
      setLikeClases: (likeClases) => {
        set({
          likeClases: likeClases ?? [],
          lastUpdated: Date.now(),
          error: null,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      // Fetch inicial y refresh
      fetchLikeClases: async () => {
        const { setLoading, setLikeClases, setError } = get();

        if (get().isLoading) return; // evitar llamadas simultáneas

        try {
          setLoading(true);
          setError(null);

          const likeClases = await getLikeClases();
          setLikeClases(likeClases);
        } catch (error: unknown) {
          console.error("Error fetching like-clases:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error al obtener like-clases";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },

      // Agregar like
      addLikeClase: async (claseId: number) => {
        const { setLoading, setLikeClases, setError, isClassLiked } = get();

        if (isClassLiked(claseId)) {
          setError("Esta clase ya tiene like");
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const updatedLikeClases = await postLikeClases(claseId);
          setLikeClases(updatedLikeClases);
        } catch (error: unknown) {
          console.error("Error adding like-clase:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error al agregar like-clase";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },

      // Eliminar like
      removeLikeClase: async (claseId: number) => {
        const { setLoading, setLikeClases, setError, isClassLiked } = get();

        if (!isClassLiked(claseId)) {
          setError("Esta clase no tiene like");
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const updatedLikeClases = await deleteLikeClases(claseId);
          setLikeClases(updatedLikeClases);
        } catch (error: unknown) {
          console.error("Error removing like-clase:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error al eliminar like-clase";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },

      // Limpiar likes (ej: logout)
      clearLikeClases: () => {
        set({
          likeClases: [],
          error: null,
          lastUpdated: null,
        });
      },
    }),
    {
      name: "like-clases-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        likeClases: state.likeClases,
        lastUpdated: state.lastUpdated,
      }),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("Store hydrated with data:", state.likeClases);
        }
      },
    }
  )
);

// ✅ Hook para inicializar likes al cargar dashboard
export const useLikeClasesInitializer = () => {
  const fetchLikeClases = useLikeClasesStore((s) => s.fetchLikeClases);
  const likeClases = useLikeClasesStore((s) => s.likeClases);
  const lastUpdated = useLikeClasesStore((s) => s.lastUpdated);

  // Memoizar la función para evitar dependencias innecesarias
  const initializeLikeClases = useCallback(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!likeClases.length || !lastUpdated || now - lastUpdated > oneHour) {
      fetchLikeClases();
    }
  }, [fetchLikeClases, likeClases.length, lastUpdated]);

  useEffect(() => {
    initializeLikeClases();
  }, [initializeLikeClases]);
};

// ✅ Hook para hacer toggle
export const useLikeClaseToggle = () => {
  const { addLikeClase, removeLikeClase, isClassLiked, isLoading } =
    useLikeClasesStore();

  const toggleLikeClase = async (claseId: number) => {
    if (isLoading) return;

    if (isClassLiked(claseId)) {
      await removeLikeClase(claseId);
    } else {
      await addLikeClase(claseId);
    }
  };

  return { toggleLikeClase, isLoading };
};

export default useLikeClasesStore;
