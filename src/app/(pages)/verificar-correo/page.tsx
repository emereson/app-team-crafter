"use client";

import Loading from "@/app/components/Loading";
import { verificarCorreo } from "@/services/auth/auth.service";
import { User } from "@/interfaces/user.type";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerificarCorreoContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchPerfil = async () => {
        try {
          const res = await verificarCorreo(token);
          setPerfil(res);
        } catch (error) {
          console.error("Error al verificar el correo:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPerfil();
    }
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div
      className="fixed inset-0 w-screen h-screen background-login z-50 flex flex-col items-center justify-center backdrop-blur-sm text-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <Image
        className="w-32 mb-4"
        src="/logo.png"
        alt="Logo de la aplicación"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-2xl text-[#fc68b9] font-bold">
        ¡Tu correo electrónico ha sido verificado con éxito!
      </h1>
      <p className="mt-2 text-base max-w-md">
        Gracias por confirmar tu cuenta. Ahora podrás acceder a todas las
        funcionalidades de nuestra plataforma con tu correo:
        <span className="font-semibold block mt-2 text-[#fc68b9]">
          {perfil?.correo}
        </span>
      </p>
    </div>
  );
}

export default function VerificarCorreoPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerificarCorreoContent />
    </Suspense>
  );
}
