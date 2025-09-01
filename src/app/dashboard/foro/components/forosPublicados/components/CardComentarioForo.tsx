import { RespuestaComentario } from "@/interfaces/comentario.interface";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PiHeart } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { handleAxiosError } from "@/utils/errorHandler";
import type { ComentarioForo } from "@/interfaces/foro.interface";
import { getRespuestaComentarioForo } from "@/services/foro.service";
import RespuestaComentariosForo from "./RespuestaComentariosForo";
import FormComentarForo from "./FormComentarForo";
import useLikeComentarioForoStore from "@/stores/likeComentarioForo.store";

interface Props {
  comentario: ComentarioForo;
}

export default function CardComentarioForo({ comentario }: Props) {
  const { isLiked, toggleLike } = useLikeComentarioForoStore();
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(
    comentario.likes_comentario_foro
  );

  const [openResponder, setOpenResponder] = useState<boolean>(false);
  const [respuestacomentarios, setRespuestaComentarios] = useState<
    RespuestaComentario[]
  >([]);

  const classText = "text-lg text-[#FFB4DF] font-medium";

  const findRespuestaComentarios = useCallback(async () => {
    try {
      const res = await getRespuestaComentarioForo(comentario.id);
      setRespuestaComentarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [comentario.id]);

  useEffect(() => {
    findRespuestaComentarios();
  }, [findRespuestaComentarios, comentario.id]);

  const handleToggleLike = async () => {
    if (isLoadingLike) return;
    setIsLoadingLike(true);

    const alreadyLiked = isLiked(comentario.id);

    try {
      await toggleLike(comentario.id);

      setLikesCount((prev) => (alreadyLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error al dar like:", error);
    } finally {
      setIsLoadingLike(false);
    }
  };

  console.log(comentario);

  return (
    <article className="w-full">
      <div className="flex gap-4">
        <Avatar
          className="w-10 h-10 flex-shrink-0"
          src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${comentario.usuario?.foto_perfil}`}
          alt={`Avatar de ${comentario.usuario.nombre}`}
        />

        <div className="flex-1 min-w-0">
          {/* Información del usuario */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
              {comentario.usuario.nombre}
            </h3>
            <time className="text-[#8A8A8A] text-sm font-light flex-shrink-0">
              {comentario.createdAt}
            </time>
          </div>

          {/* Contenido del comentario */}
          <p className="text-[#8A8A8A] leading-relaxed mb-3">
            {comentario.comentario}
          </p>

          <div className="w-full flex justify-between">
            <div className="flex gap-4  items-center">
              <button
                onClick={handleToggleLike}
                disabled={isLoadingLike}
                className={`transition-transform duration-200 ${
                  isLoadingLike ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLiked(comentario.id) ? (
                  <FaHeart className="text-2xl text-[#FC68B9] cursor-pointer" />
                ) : (
                  <PiHeart className="text-2xl text-[#FFB4DF] cursor-pointer" />
                )}
              </button>
              <p className={classText}>{likesCount}</p>
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
                  {comentario.respuesta_comentarios_foros?.length}
                </span>
              </Button>
            </div>
            <Button
              variant="light"
              size="sm"
              className="p-0 h-auto min-w-0 gap-2 text-[#FC68B9] hover:bg-[#FC68B9]/10"
              onPress={() => setOpenResponder(!openResponder)}
            >
              <span className="text-sm font-medium">Responder</span>
            </Button>
          </div>

          {openResponder && (
            <FormComentarForo
              foroId={comentario.foro_id}
              reloadForo={findRespuestaComentarios}
              respuestaComentario={true}
              comentarioId={comentario.id}
              user_comentario_id={comentario.user_id}
            />
          )}
        </div>
      </div>

      <div className="ml-10 mt-4">
        {respuestacomentarios.map((respuesta) => (
          <RespuestaComentariosForo key={respuesta.id} respuesta={respuesta} />
        ))}
      </div>
    </article>
  );
}
