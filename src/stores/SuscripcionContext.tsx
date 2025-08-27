"use client";
// stores/suscripcionStore.ts
import { create } from "zustand";
import { getSuscripcion } from "@/services/auth/suscripcion.service";
import { useEffect, useCallback } from "react";

interface Plan {
  id: number;
  nombre_plan: string;
  precio_plan: number;
  status: string;
}

interface Usuario {
  foto_perfil: string;
  nombre: string;
  correo: string;
}

interface Suscripcion {
  id: number;
  status: string;
  plan_id: number;
  startDate: string;
  endDate: string;
  precio: number;
  user_id: string;
  plan: Plan;
  usuario: Usuario;
}

interface SuscripcionState {
  // Estado
  suscripcion: Suscripcion | null;
  isLoading: boolean;
  isInitialLoading: boolean; // Nuevo estado para primera carga
  message: string;
  error: string | null;
  lastUpdated: number | null;
  refetchInterval: NodeJS.Timeout | null;

  // Getters computados
  isPremium: boolean;
  planName: string;
  isExpired: boolean;
  daysRemaining: number;
  needsUrgentRefetch: boolean;

  // Acciones
  setSuscripcion: (suscripcion: Suscripcion | null) => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
  setError: (error: string | null) => void;
  fetchSuscripcion: (force?: boolean) => Promise<void>;
  clearSuscripcion: () => void;

  // Estrategias de refetch
  startSmartRefetch: () => void;
  stopRefetch: () => void;
  forceRefetch: () => Promise<void>;
  refreshIfNeeded: () => Promise<void>;
}

const useSuscripcionStore = create<SuscripcionState>((set, get) => ({
  // Estado inicial - isInitialLoading en true para mostrar loading inicial
  suscripcion: null,
  isLoading: false,
  isInitialLoading: true, // Nuevo estado inicial
  message: "",
  error: null,
  lastUpdated: null,
  refetchInterval: null,

  // Getters computados
  get isPremium() {
    const { suscripcion, isExpired } = get();
    return !!suscripcion && suscripcion.status === "activa" && !isExpired;
  },

  get planName() {
    const { suscripcion } = get();
    return suscripcion?.plan?.nombre_plan || "";
  },

  get isExpired() {
    const { suscripcion } = get();
    if (!suscripcion) return true;
    const endDate = new Date(suscripcion.endDate);
    const now = new Date();
    return endDate < now;
  },

  get daysRemaining() {
    const { suscripcion } = get();
    if (!suscripcion) return 0;
    const endDate = new Date(suscripcion.endDate);
    const now = new Date();
    const days = Math.ceil(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, days);
  },

  get needsUrgentRefetch() {
    const { daysRemaining } = get();
    // Refetch más frecuente si quedan menos de 7 días
    return daysRemaining <= 7 && daysRemaining > 0;
  },

  // Acciones básicas
  setSuscripcion: (suscripcion) => {
    set({
      suscripcion,
      lastUpdated: Date.now(),
      error: null,
      isInitialLoading: false, // Marcar que ya no es carga inicial
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setMessage: (message) => set({ message }),
  setError: (error) => set({ error }),

  fetchSuscripcion: async (force = false) => {
    const { setLoading, setSuscripcion, setMessage, setError, lastUpdated } =
      get();

    // Evitar múltiples requests simultáneos
    const state = get();
    if (state.isLoading && !force) return;

    // Cache de 2 minutos para requests normales
    const now = Date.now();
    const cacheTime = 2 * 60 * 1000; // 2 minutos
    if (!force && lastUpdated && now - lastUpdated < cacheTime) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getSuscripcion();

      setSuscripcion(response.suscripcion);
      setMessage(response.msg);
    } catch (error: unknown) {
      console.error("Error fetching subscription:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener suscripción";
      setError(errorMessage);

      // No limpiar datos existentes en caso de error de red
      if (
        error instanceof Error &&
        (error.message.includes("network") || error.message.includes("fetch"))
      ) {
        setMessage("Error de conexión - usando datos en caché");
      } else {
        setSuscripcion(null);
        setMessage("");
      }
    } finally {
      setLoading(false); // Siempre termina en false
      set({ isInitialLoading: false }); // También terminar carga inicial
    }
  },

  clearSuscripcion: () => {
    const { stopRefetch } = get();
    stopRefetch();

    set({
      suscripcion: null,
      message: "",
      error: null,
      lastUpdated: null,
      isLoading: false, // Asegurar que esté en false al limpiar
      isInitialLoading: true, // Reset para próxima sesión
    });
  },

  // Estrategia de refetch inteligente
  startSmartRefetch: () => {
    const { stopRefetch, refreshIfNeeded } = get();

    // Limpiar interval existente
    stopRefetch();

    const runRefetch = async () => {
      const { needsUrgentRefetch, suscripcion } = get();

      // Si no hay suscripción, refetch inmediato
      if (!suscripcion) {
        await refreshIfNeeded();
        return;
      }

      // Frecuencia basada en urgencia - usar el valor calculado
      const intervalTime = needsUrgentRefetch
        ? 5 * 60 * 1000 // 5 minutos si quedan pocos días
        : 30 * 60 * 1000; // 30 minutos normalmente

      await refreshIfNeeded();

      // Programar el siguiente refetch con el tiempo calculado
      const nextTimeout = setTimeout(runRefetch, intervalTime);
      set({ refetchInterval: nextTimeout as unknown as NodeJS.Timeout });
    };

    // Refetch inicial
    runRefetch();
  },

  stopRefetch: () => {
    const { refetchInterval } = get();
    if (refetchInterval) {
      clearInterval(refetchInterval);
      set({ refetchInterval: null });
    }
  },

  forceRefetch: async () => {
    const { fetchSuscripcion } = get();
    await fetchSuscripcion(true);
  },

  refreshIfNeeded: async () => {
    const { lastUpdated, fetchSuscripcion, needsUrgentRefetch } = get();
    const now = Date.now();

    // Tiempo de cache dinámico basado en urgencia
    const cacheTime = needsUrgentRefetch
      ? 2 * 60 * 1000 // 2 minutos si es urgente
      : 10 * 60 * 1000; // 10 minutos normalmente

    if (!lastUpdated || now - lastUpdated > cacheTime) {
      await fetchSuscripcion();
    }
  },
}));

// Hook personalizado para manejo automático del refetch
export const useAutoRefetch = () => {
  const startSmartRefetch = useSuscripcionStore(
    (state) => state.startSmartRefetch
  );
  const stopRefetch = useSuscripcionStore((state) => state.stopRefetch);
  const refreshIfNeeded = useSuscripcionStore((state) => state.refreshIfNeeded);

  // Memoizar las funciones para evitar dependencias innecesarias
  const initAutoRefetch = useCallback(() => {
    startSmartRefetch();
  }, [startSmartRefetch]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      refreshIfNeeded();
    }
  }, [refreshIfNeeded]);

  useEffect(() => {
    initAutoRefetch();

    // Cleanup al desmontar
    return () => {
      stopRefetch();
    };
  }, [initAutoRefetch, stopRefetch]);

  // Refetch al volver a la pestaña
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
};

export default useSuscripcionStore;
