import { Foro } from "@/interfaces/foro.interface";
import { Avatar, Button, Divider, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { PiHeart } from "react-icons/pi";
import ModalForoSelect from "./components/ModalForoSelect";
import useLikedForoStore from "@/stores/likeForos.store";
import CardForo from "./components/CardForo";
// import ModalForoSelect from "./components/ModalForoSelect";

interface Props {
  foros: Foro[];
}

export default function ForosPublicados({ foros }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectForo, setSelectForo] = useState<Foro | null>(null);

  return (
    <section className="flex flex-col gap-4">
      {foros.map((foro, index) => (
        <CardForo
          key={foro.id}
          foro={foro}
          index={index}
          setSelectForo={setSelectForo}
          onOpen={onOpen}
        />
      ))}
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
