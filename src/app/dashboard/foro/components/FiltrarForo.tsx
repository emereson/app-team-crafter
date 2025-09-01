import { Button } from "@heroui/react";
import Image from "next/image";
import { ImClock } from "react-icons/im";

interface Props {
  order: string;
  setOrder: (i: "asc" | "desc") => void;
}

export default function FiltrarForo({ order, setOrder }: Props) {
  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };
  return (
    <section className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button
          className="bg-[#FC68B9] border-1 border-[#FC68B9] text-white font-bold  px-3"
          radius="full"
          startContent={<ImClock className="text-lg" />}
        >
          Nuevos{" "}
        </Button>
        <Button
          className="bg-[#FFE1F2] border-1 border-[#FFE1F2] text-[#FC68B9] font-bold  px-3"
          radius="full"
          startContent={
            <Image
              src={"/icons/arrowOut.svg"}
              alt="Populares"
              width={14}
              height={14}
            />
          }
        >
          Populares
        </Button>
      </div>
      <Button
        className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
        radius="full"
        onPress={toggleOrder}
        startContent={
          <Image
            className="text-xs"
            src={"/icons/arrows.svg"}
            alt="Ordenar"
            width={20}
            height={20}
          />
        }
      >
        {order === "desc" ? "Más reciente" : "Más antiguo"}
      </Button>
    </section>
  );
}
