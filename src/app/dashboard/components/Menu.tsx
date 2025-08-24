"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

interface MenuProps {
  isOpen?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
}

// Configuración centralizada
const MENU_CONFIG = {
  items: [
    { href: "/dashboard/inicio", label: "Inicio", icon: "home" },
    { href: "/dashboard/clases", label: "Clases", icon: "clases" },
    { href: "/dashboard/recursos", label: "Recursos", icon: "recursos" },
    { href: "/dashboard/descuentos", label: "Descuentos", icon: "descuento" },
    { href: "/dashboard/foro", label: "Foro", icon: "foro" },
  ],
  colors: {
    bg: "#C3F3F3",
    primary: "#68E1E0",
    accent: "#FC68B9",
    text: "white",
  },
} as const;

// Componente MenuItem con Image en lugar de bg-image
const MenuItem = memo(
  ({
    href,
    label,
    icon,
    isActive,
    onMenuToggle,
  }: {
    href: string;
    label: string;
    icon: string;
    isActive: boolean;
    onMenuToggle?: (isOpen: boolean) => void;
  }) => {
    const handleClick = () => {
      // Cerrar el menú móvil al hacer clic en un elemento
      if (onMenuToggle) {
        onMenuToggle(false);
      }
    };

    return (
      <Link
        href={href}
        className="flex items-center gap-3 sm:gap-4 pl-6 sm:pl-9 group hover:pl-7 sm:hover:pl-10 transition-all duration-200"
        prefetch={true}
        onClick={handleClick}
      >
        {/* Usando Image component en lugar de background-image */}
        <div className="h-8 w-8 sm:h-10 sm:w-10 relative transition-all duration-200 shrink-0">
          <Image
            src={`/home/${icon}-${isActive ? "yes" : "no"}.svg`}
            alt={`Icono ${label}`}
            width={40}
            height={40}
            className={`transition-opacity duration-200 ${
              isActive ? "opacity-100" : "opacity-100 group-hover:opacity-0"
            }`}
          />
          {/* Imagen hover */}
          {!isActive && (
            <Image
              src={`/home/${icon}-yes.svg`}
              alt={`Icono ${label} activo`}
              width={40}
              height={40}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          )}
        </div>

        <p
          className={`text-base sm:text-lg font-bold m-0 transition-colors duration-200 ${
            isActive
              ? "text-[#FC68B9]"
              : "text-white group-hover:text-[#FC68B9]"
          }`}
        >
          {label}
        </p>
      </Link>
    );
  }
);

MenuItem.displayName = "MenuItem";

// Componente HelpSection optimizado
const HelpSection = memo(() => (
<div className="px-4 sm:px-8 mt-4 sm:mt-6">
    <section className="w-full bg-[#68E1E0] rounded-xl sm:rounded-2xl p-3 sm:p-4 py-4 sm:py-5 flex flex-col items-start gap-2 sm:gap-3 shadow-sm">
      <Image
        className="h-[54px] w-[54px]"
        src="/home/interogation.svg"
        alt="¿Tienes dudas?"
        width={54}
        height={54}
        loading="lazy"
        onError={(e) => {
          console.error("Error cargando imagen:", e);
        }}
      />
      <h3 className="text-lg font-bold text-white mt-2">¿Tienes dudas?</h3>
      <p className="text-lg text-white leading-relaxed">
        Consulta las Preguntas Frecuentes y resuelve tus dudas al instante.
      </p>
      <Button
        className="w-full bg-transparent border border-[#FC68B9] text-[#FC68B9] font-semibold text-lg py-6 mt-2 hover:bg-[#FC68B9] hover:text-white transition-colors duration-300"
        radius="full"
      >
        Consultar
      </Button>
    </section>
  </div>
));

HelpSection.displayName = "HelpSection";

// Componente principal
export default function Menu({ isOpen = false, onMenuToggle }: MenuProps) {
  const pathname = usePathname();

  // Memoización de items del menú
  const menuItems = useMemo(
    () =>
      MENU_CONFIG.items.map((item) => (
        <MenuItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={pathname === item.href}
          onMenuToggle={onMenuToggle}
        />
      )),
    [pathname, onMenuToggle]
  );

  return (
    <>
      {/* Overlay para cerrar el menú en móvil/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onMenuToggle?.(false)}
        />
      )}

      <div
        className={`
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
      lg:flex min-w-[240px] xl:min-w-[280px] w-min bg-[#C3F3F3] py-4 sm:py-6 flex-col gap-3 sm:gap-4 
      fixed lg:relative top-[60px] sm:top-[70px] md:top-[80px] lg:top-0 left-0 z-50 lg:z-auto 
      h-[calc(100dvh-60px)] sm:h-[calc(100dvh-70px)] md:h-[calc(100dvh-80px)] lg:h-full 
      overflow-y-auto lg:overflow-visible pb-16 sm:pb-20 lg:pb-6
      transition-transform duration-300 ease-in-out
      overscroll-contain
    `}
      >
        <h2 className="ml-6 sm:ml-9 text-base sm:text-lg font-bold text-[#68E1E0]">
          MENÚ
        </h2>

       <nav className="flex flex-col gap-4 sm:gap-6">{menuItems}</nav>

<div className="flex-1 min-h-[20px] sm:min-h-[30px]" />

<HelpSection />

      </div>
    </>
  );
}
