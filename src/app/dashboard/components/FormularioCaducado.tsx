import { Recurso } from "@/interfaces/recurso.interface";
import { postExpirado } from "@/services/recursos.service";
import { inputClassNames } from "@/utils/classNames";
import { Spinner, Textarea } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  recurso: Recurso;
  onOpenChange: (i: boolean) => void;
}
export default function FormularioCaducado({ recurso, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ mensaje: string }>();

  const onSubmit = async (data: { mensaje: string }) => {
    setLoading(true);
    try {
      await postExpirado(recurso.id, data.mensaje);

      toast.success(
        "La solicitud se envio correctamente, pronto nos pondremos en contacto con usted"
      );
      reset();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-[#FC68B9]">Recurso</h2>
      <article className="flex gap-2">
        <Image
          className="aspect-[1/1] w-24 rounded-xl"
          src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso.img_recurso}`}
          alt={`caducado ${recurso.nombre_recurso}`}
          width={100}
          height={100}
        />
        <h3 className="font-semibold text-[#8A8A8A]">
          {recurso.nombre_recurso}
        </h3>
      </article>
      <h2 className="text-lg font-semibold text-[#FC68B9]">Asunto</h2>
      <p className="text-xl font-semibold text-[#8A8A8A]">
        EXPIRADO TEAM CRAFTER
      </p>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-semibold text-[#FC68B9]">Mensaje</p>
        <Textarea
          isRequired
          classNames={inputClassNames}
          {...register("mensaje")}
          placeholder="¿Tienes algún detalle o pregunta adicional sobre este recurso?"
          labelPlacement="outside"
          errorMessage="El contenido es obligatorio"
          radius="full"
          minRows={4}
        />
        <button
          className="w-full p-3  text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] font-bold cursor-pointer "
          type="submit"
        >
          {loading ? <Spinner color="danger" /> : "Envíar"}
        </button>
      </form>
    </div>
  );
}
