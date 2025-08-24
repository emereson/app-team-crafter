"use client";
import { Avatar, Button, Textarea } from "@heroui/react";
import { useState } from "react";

export default function ComentarClase() {
  const [value, setValue] = useState("");

  return (
    <section className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
      <Avatar
        className="w-8 h-8 sm:w-10 sm:h-10 self-start sm:self-auto"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <article className="w-full flex flex-col items-end gap-2 sm:gap-3">
        <Textarea
          placeholder="... Escribe un comentario"
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
          minRows={3}
          maxRows={5}
          className="w-full"
        />
        <Button
          className="px-4 sm:px-6 bg-[#FC68B9] text-white text-sm sm:text-base md:text-lg font-bold"
          radius="full"
          size="sm"
        >
          Publicar
        </Button>
      </article>
    </section>
  );
}
