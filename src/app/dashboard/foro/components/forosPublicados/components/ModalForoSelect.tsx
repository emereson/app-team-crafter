import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  ModalContent,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";

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
  respuestaAComentarioId?: number; // Cambiado de respuesta_foro_id
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

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectForo: Foro;
}

const RespuestaItem: React.FC<RespuestaItemProps> = ({
  respuesta,
  onLikeRespuesta,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    onLikeRespuesta?.(respuesta.id);
  }, [respuesta.id, onLikeRespuesta]);

  return (
    <article className="flex gap-3">
      <Avatar
        className="w-8 h-8 flex-shrink-0"
        src={respuesta.usuario.avatar}
        alt={`Avatar de ${respuesta.usuario.nombre}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-[#8A8A8A] font-semibold text-sm truncate">
            {respuesta.usuario.nombre}
          </p>
          <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
            {respuesta.tiempo}
          </time>
        </div>

        <div className="mb-2">
          {respuesta.respuestaAComentarioId && respuesta.usuario_repuesta && (
            <Link
              href="#"
              className="text-xs font-semibold text-[#FC68B9] hover:underline mr-1"
            >
              @{respuesta.usuario_repuesta.usuario.nombre}
            </Link>
          )}
          <p className="text-sm text-[#8A8A8A] leading-relaxed">
            {respuesta.texto}
          </p>
        </div>

        <Button
          variant="light"
          size="sm"
          className="p-0 h-auto min-w-0 gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
          onPress={handleLike}
          startContent={
            isLiked ? (
              <PiHeartFill className="text-lg text-[#FC68B9]" />
            ) : (
              <PiHeart className="text-lg text-[#FC68B9]" />
            )
          }
        >
          <span className="text-xs font-medium">
            {isClient ? respuesta.likes.toLocaleString() : respuesta.likes}
          </span>
        </Button>
      </div>
    </article>
  );
};

export default function ModalForoSelect({
  isOpen,
  onOpenChange,
  selectForo,
}: Props) {
  console.log(selectForo);

  // Estados necesarios que faltaban
  const [mostrarRespuestas] = useState<boolean>(true);

  const tieneRespuestas: boolean = selectForo.respuestas?.length > 0;

  // Función que faltaba para manejar likes
  const onLikeRespuesta = useCallback((respuestaId: number) => {
    console.log("Like en respuesta:", respuestaId);
    // Aquí puedes agregar la lógica para actualizar el like en el backend
  }, []);

  // Función para enviar comentario
  const handleSubmitComentario = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar comentario
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
    >
      <ModalContent className="w-full p-0">
        {() => (
          <article
            key={selectForo.id}
            className="w-full p-5 bg-[#FFEE97] flex flex-col gap-2 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  className="w-8 h-8 flex-shrink-0"
                  src={selectForo.usuario.avatar}
                  alt={`Avatar de ${selectForo.usuario.nombre}`}
                />
                <div className="flex flex-col">
                  <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
                    {selectForo.usuario.nombre}
                  </h3>
                  <time className="text-[#8A8A8A] text-xs font-light flex-shrink-0">
                    {selectForo.tiempo}
                  </time>
                </div>
              </div>
            </div>

            {selectForo.img_foro && (
              <Image
                src={selectForo.img_foro}
                alt={`Imagen del foro ${selectForo.titulo}`}
                width={600}
                height={300}
                className="w-full h-auto rounded-lg object-cover"
              />
            )}

            <h3 className="text-xl text-[#8A8A8A] font-bold">
              {selectForo.titulo}
            </h3>

            <p className="text-medium text-[#8A8A8A] font-medium">
              {selectForo.texto}
            </p>

            <Button
              variant="light"
              size="sm"
              className="p-0 h-auto min-w-0 w-fit gap-1.5 text-[#FC68B9] hover:bg-[#FC68B9]/10"
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
                {selectForo.respuestas.length}
              </span>
            </Button>

            <form
              className="w-full flex items-center gap-2 mt-2"
              onSubmit={handleSubmitComentario}
            >
              <Avatar
                className="w-8 h-8 flex-shrink-0"
                src={selectForo.usuario.avatar}
                alt={`Avatar de ${selectForo.usuario.nombre}`}
              />
              <Input
                className="w-full"
                placeholder="Escribir comentario"
                classNames={{
                  inputWrapper:
                    "bg-[#F1F6FB] data-[hover=true]:bg-[#F1F6FB] h-11 px-6",
                }}
              />
            </form>

            <div className="w-full flex justify-between items-center mt-2">
              <span className="text-[#FC68B9] font-semibold">
                {selectForo.respuestas.length} Comentarios
              </span>
              <button
                className="text-[#FC68B9] font-semibold flex items-center gap-2"
                type="button"
                onClick={() => {
                  /* Lógica para ordenar */
                }}
              >
                <Image
                  className="text-xs"
                  src="/icons/arrows.svg"
                  alt="Más reciente"
                  width={20}
                  height={20}
                />
                Más reciente
              </button>
            </div>

            <Divider />

            {tieneRespuestas && mostrarRespuestas && (
              <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                {selectForo.respuestas.map((respuesta: Respuesta) => (
                  <RespuestaItem
                    key={respuesta.id}
                    respuesta={respuesta}
                    onLikeRespuesta={onLikeRespuesta}
                  />
                ))}
              </div>
            )}
          </article>
        )}
      </ModalContent>
    </Modal>
  );
}
