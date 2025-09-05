"use client";
import { User } from "@/interfaces/user.type";
import { getPerfil } from "@/services/auth/auth.service";
import {
  postComentario,
  postRespuestaComentario,
} from "@/services/comentarios.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  claseId: number;
  findComentarios: () => void;
  respuestaComentario?: boolean;
  user_comentario_id?: string;
  comentarioId?: number;
  onCancel?: () => void;
}

export default function ComentarClase({
  claseId,
  findComentarios,
  respuestaComentario = false,
  user_comentario_id,
  comentarioId,
  onCancel,
}: Props) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 🆕 Estado de carga
  const [perfil, setPerfil] = useState<User | null>(null); // 👈 inicializar como null

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await getPerfil();
        setPerfil(res);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    fetchPerfil();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim() || isLoading) return;

    setIsLoading(true);

    try {
      if (respuestaComentario && comentarioId && user_comentario_id) {
        await postRespuestaComentario(comentarioId, value, user_comentario_id);
      } else {
        await postComentario(claseId, value);
      }

      findComentarios();
      setValue("");
      toast.success(
        respuestaComentario ? "Respuesta enviada" : "Comentario enviado"
      );

      // Si es una respuesta y hay callback de cancelar, ejecutarlo
      if (respuestaComentario && onCancel) {
        onCancel();
      }
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`w-full flex gap-4 ${respuestaComentario ? "mt-4" : "mt-12"} `}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${perfil?.foto_perfil}`}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-end gap-2"
      >
        <Textarea
          placeholder={
            respuestaComentario
              ? "... Escribe una respuesta"
              : "... Escribe un comentario"
          }
          classNames={{
            inputWrapper: `
              border-1 border-[#FC68B9]
              data-[hover=true]:border-[#FC68B9]
              data-[focus=true]:border-[#FC68B9]
            `,
          }}
          value={value}
          variant="bordered"
          onValueChange={setValue}
          minRows={respuestaComentario ? 3 : 5} // 🔧 Menos filas para respuestas
          isDisabled={isLoading}
        />

        <div className="flex gap-2">
          {/* 🆕 Botón cancelar para respuestas */}
          {respuestaComentario && onCancel && (
            <Button
              variant="bordered"
              className="px-4 border-[#FC68B9] text-[#FC68B9]"
              radius="full"
              onPress={onCancel}
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
          )}

          <Button
            className="px-6 bg-[#FC68B9] text-white text-lg font-bold"
            radius="full"
            type="submit"
            isDisabled={!value.trim() || isLoading}
            isLoading={isLoading}
          >
            {respuestaComentario ? "Responder" : "Publicar"}
          </Button>
        </div>
      </form>
    </section>
  );
}
