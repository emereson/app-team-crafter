import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export default function TituloForo() {
  return (
    <section className="w-full flex flex-col gap-6">
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Foro</BreadcrumbItem>
      </Breadcrumbs>
      <h1
        className="relative  m-auto w-fit text-6xl font-black text-[#96EAEA] flex items-center  justify-center uppercase
      max-sm:text-3xl
      "
      >
        Comunidad de <br />
        <strong
          className="absolute -bottom-13 text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case
        max-sm:text-5xl max-sm:-bottom-8
        "
        >
          team crafter
        </strong>
      </h1>
    </section>
  );
}
