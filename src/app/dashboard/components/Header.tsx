"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDownSLine } from "react-icons/ri";

interface HeaderProps {
  onMenuToggle: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    onMenuToggle(newState);
  };

  return (
    <header className="w-full h-[60px] sm:h-[70px] md:h-[80px] px-3 sm:px-4 md:px-20 bg-[#fc68b9] flex items-center justify-between relative z-50">
      {/* Botón hamburguesa - solo visible en móvil */}
      <button
        onClick={toggleMenu}
        className="lg:hidden sm:mr-4 flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-50"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Logo - oculto en móvil */}
      <Image
        className="h-[40px] sm:h-[45px] md:h-[54px] w-auto hidden sm:block lg:block"
        src="/logo.png"
        alt="Logo PS y AI"
        width={200}
        height={200}
        priority
      />

{/* Barra de búsqueda - visible en todos los tamaños */}
<form className="relative flex-1 max-w-sm sm:max-w-md lg:max-w-xl ml-2 sm:ml-4 lg:ml-20 mr-3 sm:mr-4 bg-[#FFE1F2] items-center rounded-full overflow-hidden flex">
  <input
    className="py-2 sm:py-2.5 px-3 sm:px-5 placeholder:text-[#FFB4DF] text-sm sm:text-lg font-bold flex-1 bg-transparent outline-none"
    type="text"
    placeholder="Buscar"
  />

  <button className="absolute right-0 h-full p-2 sm:p-3 px-3 sm:px-5 hover:bg-[#ffd2ec] cursor-pointer">
    <Image
      className="h-4 w-4 sm:h-5 sm:w-5"
      src="/icons/search.svg"
      alt="Buscar"
      width={20}
      height={20}
    />
  </button>
</form>

{/* Notificaciones y Avatar - siempre visibles */}
<div className="flex items-center gap-2 sm:gap-3 shrink-0">

      <Link href={"/dashboard/notificaciones"}>
  <Image
    className="h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] md:h-[48px] md:w-[48px]"
    src="/icons/notification.svg"
    alt="notificaciones"
    width={48}
    height={48}
  />
</Link>

        <Dropdown
          classNames={{
            base: "before:bg-[#FFE1F2]",
            content:
              " bg-[#FFE1F2] from-white to-default-100 dark:from-default-50 dark:to-black",
          }}
        >
          <DropdownTrigger>
            <div className="flex items-center text-white gap-2 cursor-pointer">
              <Image
                className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] md:h-[40px] md:w-[40px] border-1 border-[#68E1E0] rounded-full"
                src="/avatar.png"
                alt="notificaciones"
                width={100}
                height={100}
              />

              <p className="text-base font-bold hidden sm:block">
                Natalia Tobar
              </p>
              <RiArrowDownSLine className="text-2xl" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              className=" px-6 py-1.5 data-[hover=true]:bg-[#ffcce9]"
              key="mi-cuenta"
              href="/dashboard/mi-cuenta"
              startContent={
                <Image
                  className="h-[40px] w-[40px]"
                  src="/icons/miCuenta.svg"
                  alt="notificaciones"
                  width={100}
                  height={100}
                />
              }
            >
              <p className="text-[#FC68B9] text-base font-semibold">
                Mi cuenta
              </p>
            </DropdownItem>
            <DropdownItem
              className=" px-6 py-1.5 data-[hover=true]:bg-[#ffcce9]"
              key="favoritos"
              startContent={
                <Image
                  className="h-[40px] w-[40px]"
                  src="/icons/favoritos.svg"
                  alt="notificaciones"
                  width={100}
                  height={100}
                />
              }
            >
              <p className="text-[#FC68B9] text-base font-semibold">
                Favoritos
              </p>
            </DropdownItem>
            <DropdownItem
              className=" px-6 py-1.5 data-[hover=true]:bg-[#ffcce9]"
              key="cerrar-sesion"
              startContent={
                <Image
                  className="h-[40px] w-[40px]"
                  src="/icons/cerrarSesion.svg"
                  alt="notificaciones"
                  width={100}
                  height={100}
                />
              }
            >
              <p className="text-[#FC68B9] text-base font-semibold">
                Cerrar Sesión
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
