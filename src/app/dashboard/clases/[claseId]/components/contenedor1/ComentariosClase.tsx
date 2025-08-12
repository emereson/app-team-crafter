"use client";

import { Avatar, Link, Button } from "@heroui/react";
import Image from "next/image";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { useState, useCallback, useMemo, useEffect } from "react";

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
  respuestaAComentarioId?: number;
  usuario_repuesta?: UsuarioRespuesta;
}

interface Comentario {
  id: number;
  usuario: Usuario;
  tiempo: string;
  texto: string;
  likes: number;
  respuestas: Respuesta[];
}

// Props interfaces
interface ComentarioAccionesProps {
  likes: number;
  onLike: () => void;
  onResponder: () => void;
  isLiked: boolean;
}

interface RespuestaItemProps {
  respuesta: Respuesta;
  onLikeRespuesta?: (respuestaId: number) => void;
}

interface ComentarioItemProps {
  comentario: Comentario;
  onLikeComentario?: (comentarioId: number) => void;
  onLikeRespuesta?: (respuestaId: number) => void;
  onResponder?: (comentarioId: number) => void;
}

interface ComentariosClaseProps {
  comentarios?: Comentario[];
  onLikeComentario?: (comentarioId: number) => void;
  onLikeRespuesta?: (respuestaId: number) => void;
  onResponder?: (comentarioId: number) => void;
  className?: string;
}

// Interfaces y tipos
const ComentarioAcciones: React.FC<ComentarioAccionesProps> = ({
  likes,
  onLike,
  onResponder,
  isLiked,
}) => (
  <div className="flex gap-4 mt-2">
    <Button
      variant="light"
      size="sm"
      className="p-0 h-auto min-w-0 gap-2 text-[#FC68B9] hover:bg-[#FC68B9]/10"
      onPress={onLike}
      startContent={
        isLiked ? (
          <PiHeartFill className="text-xl text-[#FC68B9]" />
        ) : (
          <PiHeart className="text-xl text-[#FC68B9]" />
        )
      }
    >
      <span className="text-sm font-medium">{likes}</span>
    </Button>

    <Button
      variant="light"
      size="sm"
      className="p-0 h-auto min-w-0 gap-2 text-[#FC68B9] hover:bg-[#FC68B9]/10"
      onPress={onResponder}
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
      <span className="text-sm font-medium">Responder</span>
    </Button>
  </div>
);

// Componente separado para respuestas individuales
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

// Componente principal para comentarios individuales
const ComentarioItem: React.FC<ComentarioItemProps> = ({
  comentario,
  onLikeComentario,
  onLikeRespuesta,
  onResponder,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [mostrarRespuestas, setMostrarRespuestas] = useState<boolean>(true);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    onLikeComentario?.(comentario.id);
  }, [comentario.id, onLikeComentario]);

  const handleResponder = useCallback(() => {
    onResponder?.(comentario.id);
  }, [comentario.id, onResponder]);

  const toggleRespuestas = useCallback(() => {
    setMostrarRespuestas((prev) => !prev);
  }, []);

  const tieneRespuestas: boolean = comentario.respuestas?.length > 0;
  const cantidadRespuestas: number = comentario.respuestas?.length || 0;

  return (
    <article className="w-full">
      <div className="flex gap-4">
        <Avatar
          className="w-10 h-10 flex-shrink-0"
          src={comentario.usuario.avatar}
          alt={`Avatar de ${comentario.usuario.nombre}`}
        />

        <div className="flex-1 min-w-0">
          {/* Información del usuario */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[#8A8A8A] font-bold text-sm truncate">
              {comentario.usuario.nombre}
            </h3>
            <time className="text-[#8A8A8A] text-sm font-light flex-shrink-0">
              {comentario.tiempo}
            </time>
          </div>

          {/* Contenido del comentario */}
          <p className="text-[#8A8A8A] leading-relaxed mb-3">
            {comentario.texto}
          </p>

          {/* Acciones del comentario */}
          <ComentarioAcciones
            likes={comentario.likes}
            onLike={handleLike}
            onResponder={handleResponder}
            isLiked={isLiked}
          />

          {/* Toggle de respuestas */}
          {tieneRespuestas && (
            <Button
              variant="light"
              size="sm"
              className="mt-2 p-0 h-auto min-w-0 text-[#FC68B9] hover:bg-[#FC68B9]/10"
              onPress={toggleRespuestas}
            >
              <span className="text-xs font-medium">
                {mostrarRespuestas ? "Ocultar" : "Mostrar"} {cantidadRespuestas}{" "}
                respuesta{cantidadRespuestas !== 1 ? "s" : ""}
              </span>
            </Button>
          )}

          {/* Respuestas */}
          {tieneRespuestas && mostrarRespuestas && (
            <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
              {comentario.respuestas.map((respuesta: Respuesta) => (
                <RespuestaItem
                  key={respuesta.id}
                  respuesta={respuesta}
                  onLikeRespuesta={onLikeRespuesta}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

// Mock data con tipado explícito
const comentariosData: Comentario[] = [
  {
    id: 1,
    usuario: {
      nombre: "Mollie Valverde",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    tiempo: "56 minutos",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis magna risus, ut egestas tortor convallis vel.",
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
        respuestaAComentarioId: 11,
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
    texto: "Me encantó la explicación del tema. Muy clara y concisa.",
    likes: 300,
    respuestas: [],
  },
];

// Componente principal con props tipadas
const ComentariosClase: React.FC<ComentariosClaseProps> = ({
  comentarios: comentariosProp,
  onLikeComentario,
  onLikeRespuesta,
  onResponder,
  className = "",
}) => {
  // Usar comentarios de props o datos por defecto
  const comentariosIniciales = useMemo<Comentario[]>(
    () => comentariosProp || comentariosData,
    [comentariosProp]
  );

  const [comentarios] = useState<Comentario[]>(comentariosIniciales);

  // Handlers para las acciones con tipado
  const handleLikeComentario = useCallback(
    (comentarioId: number): void => {
      console.log(`Like en comentario: ${comentarioId}`);
      onLikeComentario?.(comentarioId);
      // Aquí iría la lógica para actualizar likes en el servidor
    },
    [onLikeComentario]
  );

  const handleLikeRespuesta = useCallback(
    (respuestaId: number): void => {
      console.log(`Like en respuesta: ${respuestaId}`);
      onLikeRespuesta?.(respuestaId);
      // Aquí iría la lógica para actualizar likes de respuesta en el servidor
    },
    [onLikeRespuesta]
  );

  const handleResponder = useCallback(
    (comentarioId: number): void => {
      console.log(`Responder a comentario: ${comentarioId}`);
      onResponder?.(comentarioId);
      // Aquí iría la lógica para abrir modal/form de respuesta
    },
    [onResponder]
  );

  // Early return con tipado
  if (!comentarios.length) {
    return (
      <section className={`w-full mt-12 ${className}`}>
        <p className="text-center text-[#8A8A8A] py-8">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </p>
      </section>
    );
  }

  return (
    <section
      className={`w-full mt-12 ${className}`}
      role="region"
      aria-label="Sección de comentarios"
    >
      <div className="space-y-8">
        {comentarios.map((comentario: Comentario) => (
          <ComentarioItem
            key={comentario.id}
            comentario={comentario}
            onLikeComentario={handleLikeComentario}
            onLikeRespuesta={handleLikeRespuesta}
            onResponder={handleResponder}
          />
        ))}
      </div>
    </section>
  );
};

export default ComentariosClase;

// Exportar tipos para uso en otros componentes
export type {
  Usuario,
  Respuesta,
  Comentario,
  ComentariosClaseProps,
  ComentarioItemProps,
  RespuestaItemProps,
  ComentarioAccionesProps,
};
