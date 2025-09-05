import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export default function TituloMiCuenta() {
  return (
    <section className="w-full flex flex-col gap-6">
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Mi cuenta</BreadcrumbItem>
      </Breadcrumbs>
      <h1
        className="relative  m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center  justify-center uppercase
      max-sm:text-4xl
      "
      >
        Mi cuenta
      </h1>
    </section>
  );
}
