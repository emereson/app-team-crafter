"use client";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { useEffect } from "react";

export default function PlanIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);

  useEffect(() => {
    forceRefetch();
  }, []);

  return <>{children}</>;
}
