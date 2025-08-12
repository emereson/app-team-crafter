import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { PiHeart } from "react-icons/pi";
import ModalForoSelect from "./components/ModalForoSelect";

interface Usuario {
  nombre: string;
  avatar: string;
}

interface UsuarioRespuesta {
  usuario: Usuario;
}

interface Respuesta {
  id: number;
  usuario: Usuario;
  tiempo: string;
  texto: string;
  likes: number;
  respuesta_foro_id?: number;
  usuario_repuesta?: UsuarioRespuesta;
}

interface Foro {
  id: number;
  usuario: Usuario;
  tiempo: string;
  texto: string;
  likes: number;
  titulo: string;
  img_foro?: string;

  respuestas: Respuesta[];
}
const forosData: Foro[] = [
  {
    id: 1,
    usuario: {
      nombre: "Mollie Valverde",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    tiempo: "56 minutos",
    titulo: "Ideas para decorar con papel de scrap",
    texto:
      "Estoy buscando ideas para decorar cajas de regalo con papel de scrapbooking...",
    likes: 1200,
    respuestas: [
      {
        id: 11,
        usuario: {
          nombre: "Juan Pérez",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024x",
        },
        tiempo: "30 minutos",
        texto: "Totalmente de acuerdo contigo, Mollie. Muy buen comentario.",
        likes: 50,
      },
      {
        id: 12,
        respuesta_foro_id: 11,
        usuario_repuesta: {
          usuario: {
            nombre: "Juan Pérez",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024x",
          },
        },
        usuario: {
          nombre: "Ana García",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024z",
        },
        tiempo: "25 minutos",
        texto: "También pienso lo mismo, excelente análisis del tema.",
        likes: 32,
      },
    ],
  },
  {
    id: 2,
    usuario: {
      nombre: "Carlos Sánchez",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024y",
    },
    tiempo: "1 hora",
    titulo: "Consejos para cortar vinilo con plóter",
    texto: "Quisiera saber cómo hacer cortes más precisos en mi máquina...",
    likes: 300,
    img_foro: "/foro_img.png",
    respuestas: [],
  },
];

export default function ForosPublicados() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectForo, setSelectForo] = useState<Foro | null>(null);
  const colores = ["bg-[#FFEE97]", "bg-[#C3F3F3]", "bg-[#FFE1F2]"];
  return (
    <section className="flex flex-col gap-4">
      {forosData.map((foro, index) => {
        const bgColor = colores[index % colores.length];
        return (
          <article
            key={foro.id}
            className={`w-full p-5 ${bgColor} flex flex-col gap-2 rounded-2xl`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-8 h-8 flex-shrink-0"
                  src={foro.usuario.avatar}
                  alt={`Avatar de ${foro.usuario.nombre}`}
                />
                <div className="flex flex-col">
                  <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                    {foro.usuario.nombre}
                  </h3>
                  <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                    {foro.tiempo}
                  </time>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="light"
                  size="sm"
                  className="p-0 h-auto min-w-0 gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
                  startContent={<PiHeart className="text-xl text-[#FC68B9]" />}
                >
                  <span className="text-xs font-semibold">
                    {foro.likes.toLocaleString("es-ES")}
                  </span>
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="p-0 h-auto min-w-0 gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
                  startContent={
                    <Image
                      src="/icons/message.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="opacity-80"
                    />
                  }
                >
                  <span className="text-sm font-medium">
                    {foro.respuestas.length}
                  </span>
                </Button>
              </div>
            </div>

            {foro.img_foro && (
              <Image
                src={foro.img_foro}
                alt={`Imagen del foro ${foro.titulo}`}
                width={600}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
              />
            )}

            <h3 className="text-xl text-[#8A8A8A] font-bold">{foro.titulo}</h3>
            <p className="text-medium text-[#8A8A8A] font-medium">
              {foro.texto}
            </p>
            <Divider />
            <button
              className="w-min text-medium text-[#FC68B9] font-semibold underline cursor-pointer"
              onClick={() => {
                setSelectForo(foro);
                onOpen();
              }}
            >
              Comentar
            </button>
          </article>
        );
      })}
      {selectForo && (
        <ModalForoSelect
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          selectForo={selectForo}
        />
      )}
    </section>
  );
}
