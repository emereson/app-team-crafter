import { Recurso } from "@/interfaces/recurso.interface";
import { Modal, ModalContent } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import FormularioCaducado from "./FormularioCaducado";

interface Props {
  onOpenChange: (i: boolean) => void;
  isOpen: boolean;
  recurso: Recurso;
}

export default function ModalRecursoCaducado({
  onOpenChange,
  isOpen,
  recurso,
}: Props) {
  const [verFormulario, setVerFormulario] = useState(false);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
      <ModalContent
        className={`w-full p-6  ${
          recurso.tipo_recurso === "Exclusivos"
            ? "bg-[#FFE1F2]"
            : "bg-[#FFEE97]"
        }`}
      >
        {verFormulario ? (
          <FormularioCaducado recurso={recurso} />
        ) : (
          <div className="text-center text-[#FC68B9] font-bold flex flex-col items-center gap-3">
            <BsExclamationCircle className="text-2xl m-auto" />
            <h2 className="text-lg">¡RECURSO CADUCADO!</h2>
            <p>
              {recurso.tipo_recurso === "Exclusivos"
                ? "Lo sentimos, han caducado los 30 días para la descarga de este archivo, cuando llega a la fecha límite no hay opción a solicitarlo. Para más información darle clic a contactarse."
                : "Lo sentimos, han caducado los 30 días para la descarga de este archivo. Si deseas comprarlo por separado puedes adquirirlo en nuestra tienda web"}
            </p>
            {recurso.tipo_recurso === "Exclusivos" ? (
              <button
                className="w-full p-3 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
                onClick={() => setVerFormulario(true)}
              >
                Contactarse
              </button>
            ) : (
              <Link
                href={"https://glorialobatonarchivos.com/"}
                target="_blank"
                className="w-full p-3 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
              >
                Ir a Tienda de archivos
              </Link>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
