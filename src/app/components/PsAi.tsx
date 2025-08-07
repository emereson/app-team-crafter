import Image from "next/image";

export default function PsAi() {
  return (
    <section className=" w-full h-full flex flex-col items-center justify-center">
      <Image
        className="w-full h-auto max-w-lg"
        src="/PsAi.png"
        alt="ps y ai"
        width={800}
        height={800}
      />
      <Image
        className="px-6 w-full"
        src="/compatibleCon.png"
        alt="ps y ai"
        width={800}
        height={800}
      />
    </section>
  );
}
