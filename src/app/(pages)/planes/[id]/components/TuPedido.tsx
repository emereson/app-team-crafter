import CorreoNoVerificado from "@/app/components/CorreoNoVerificado";
import Loading from "@/app/components/Loading";
import { getPerfil } from "@/services/auth/auth.service";
import { postSuscripcion } from "@/services/auth/suscripcion.service";
import { User } from "@/interfaces/user.type";
import { handleAxiosError } from "@/utils/errorHandler";
import { planes } from "@/utils/planes";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TuPedido() {
  const params = useParams();
  const id = params?.id as string;
  const [perfil, setPerfil] = useState<User | null>(null); // 👈 inicializar como null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await getPerfil(); // 👈 ahora sí esperamos el async
        setPerfil(res);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <Loading />;
  if (perfil && perfil.emailVerified === false) {
    <CorreoNoVerificado perfil={perfil} />;
  }

  const productoFind = planes.find((p) => p.id === Number(id));

  const handlePay = async () => {
    setLoading(true);
    if (productoFind) {
      try {
        const response = await postSuscripcion(productoFind.id);
        console.log(response);

        window.location.href = response.payment.redirectUrl;
      } catch (error) {
        console.error(error);
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section className="w-full min-w-[300px]  h-full bg-white p-14 rounded-2xl  flex flex-col justify-center items-start  gap-14 ">
      <h1 className="text-xl font-bold text-[#68E1E0]">Tu pedido</h1>
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
      <Image
        className="w-24"
        src={"/icons/flow.svg"}
        alt="flow"
        width={200}
        height={200}
      />
      <p>
        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu
        experiencia en esta web y otros propósito descritos en nuestra{" "}
        <Link href={"/"}>política de privacidad</Link>
      </p>
      <Button
        className="w-full bg-[#fa89c7] text-white text-xl font-semibold px-8 py-6 border-3 border-[#fa89c7] hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
        radius="full"
        onPress={handlePay}
      >
        {loading ? <Spinner /> : "Suscribirse"}
      </Button>{" "}
    </section>
  );
}
