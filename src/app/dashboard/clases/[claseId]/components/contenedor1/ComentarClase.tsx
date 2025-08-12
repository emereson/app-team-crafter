"use client";
import { Avatar, Button, Textarea } from "@heroui/react";
import { useState } from "react";

export default function ComentarClase() {
  const [value, setValue] = useState("");

  return (
    <section className="w-full flex gap-4 mt-12">
      <Avatar
        className="w-10 h-10"
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <article className="w-full flex flex-col items-end gap-2">
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
          minRows={5}
        />
        <Button
          className=" px-6 bg-[#FC68B9] text-white text-lg font-bold"
          radius="full"
        >
          Publicar
        </Button>
      </article>
    </section>
  );
}
