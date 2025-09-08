import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import Loading from "@/app/components/Loading";
import {
  getPerfil,
  getPerfilRegistrarTarjeta,
} from "@/services/auth/auth.service";
import { postSuscripcion } from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { planes } from "@/utils/planes";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;

  // 🔥 TODOS LOS HOOKS DEBEN IR AL PRINCIPIO, ANTES DE CUALQUIER RETURN
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ TODOS LOS useEffect TAMBIÉN DEBEN IR AQUÍ
  const productoFind = planes.find((p) => p.id === Number(id));

  const fetchPerfil = async () => {
    try {
      const res = await getPerfil();

      setPerfil(res.perfil);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPerfil();
  }, [id]);

  const fetchPayment = async () => {
    if (productoFind) {
      try {
        await postSuscripcion(productoFind.id);

        const res = await getPerfilRegistrarTarjeta();

        setPerfil(res.perfil);
        window.location.href = res.url;
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ AHORA SÍ, DESPUÉS DE TODOS LOS HOOKS, LOS RETURNS CONDICIONALES
  if (loading) {
    return <Loading />;
  }

  if (perfil && perfil.emailVerified === false) {
    return <CorreoNoVerificado perfil={perfil} />;
  }

  return (
    <section
      className="w-1/2 min-w-[300px] h-full bg-white p-14 rounded-2xl flex flex-col justify-center items-start gap-14 max-sm:p-10 max-sm:w-full
    "
    >
      <h1 className="text-xl font-bold text-[#68E1E0]">Tu pedido</h1>

      {/* Detalles del pedido */}
      <ul className="w-full space-y-4">
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Producto</p>
          <p>{productoFind?.nombre_plan}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Subtotal</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
        <li className="text-[#8A8A8A] text-base font-semibold grid grid-cols-2 gap-10">
          <p>Total</p>
          <p>${productoFind?.precio_plan.toFixed(2)}</p>
        </li>
      </ul>

      {/* Logo Flow */}
      <Image
        className="w-24"
        src="/icons/flow.svg"
        alt="Flow"
        width={200}
        height={200}
      />

      {/* Política de privacidad */}
      <p className="text-sm text-gray-600">
        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu
        experiencia en esta web y otros propósito descritos en nuestra{" "}
        <Link href="/" className="text-[#fc68b9] hover:underline">
          política de privacidad
        </Link>
      </p>
      {/* {openForm && <FlowSubscribe token={tokenTarjeta} />} */}

      <Button
        className="w-full bg-[#fa89c7] text-white text-xl font-semibold px-8 py-6 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
        radius="full"
        onPress={fetchPayment}
        // isDisabled={processingPayment}
      >
        Suscribirse
      </Button>
    </section>
  );
}
