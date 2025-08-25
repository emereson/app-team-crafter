"use client";

import { removeToken } from "@/utils/authUtils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/iniciar-sesion");
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    console.log("Buscando:", searchTerm);
  };

  return (
    <header className="w-full h-[80px] px-4 md:px-20 bg-[#fc68b9] flex items-center justify-between">
      <Image
        className="h-[54px] w-auto flex-shrink-0"
        src="/logo.png"
        alt="Logo PS y AI"
        width={200}
        height={54}
        priority
      />

      <form
        onSubmit={handleSearch}
        className="relative w-full max-w-xl mx-4 md:mx-20 bg-[#FFE1F2] flex items-center rounded-full overflow-hidden"
      >
        <input
          name="search"
          className="w-full py-2.5 px-5 bg-transparent placeholder:text-[#FFB4DF] text-lg font-bold text-[#fc68b9] focus:outline-none"
          type="text"
          placeholder="Buscar"
        />
        <button
          type="submit"
          className="absolute right-0 h-full p-3 px-5 hover:bg-[#ffd2ec] cursor-pointer transition-colors"
          aria-label="Buscar"
        >
          <Image
            className="h-full w-auto"
            src="/icons/search.svg"
            alt="Buscar"
            width={24}
            height={24}
          />
        </button>
      </form>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link href="/dashboard/notificaciones" aria-label="Notificaciones">
          <Image
            className="h-[40px] w-auto hover:opacity-80 transition-opacity"
            src="/icons/notification.svg"
            alt="Notificaciones"
            width={40}
            height={40}
          />
        </Link>

        <Dropdown
          classNames={{
            base: "before:bg-[#FFE1F2]",
            content:
              "bg-[#FFE1F2] min-w-[200px] shadow-lg border border-[#ffcce9]",
          }}
        >
          <DropdownTrigger>
            <div className="flex items-center text-white gap-2 cursor-pointer hover:opacity-90 transition-opacity">
              <Image
                className="h-[40px] w-[40px] border-2 border-[#68E1E0] rounded-full object-cover"
                src="/avatar.png"
                alt="Avatar usuario"
                width={40}
                height={40}
              />
              <p className="text-base font-bold hidden sm:block">
                Natalia Tobar
              </p>
              <RiArrowDownSLine className="text-2xl" />
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="Menú de usuario" variant="flat">
            <DropdownItem
              key="mi-cuenta"
              className="px-4 py-3 data-[hover=true]:bg-[#ffcce9] rounded-lg mx-2 my-1"
              startContent={
                <Image
                  className="h-[24px] w-[24px]"
                  src="/icons/miCuenta.svg"
                  alt="Mi cuenta"
                  width={24}
                  height={24}
                />
              }
            >
              <Link
                href="/dashboard/mi-cuenta"
                className="text-[#FC68B9] text-base font-semibold w-full block"
              >
                Mi cuenta
              </Link>
            </DropdownItem>

            <DropdownItem
              key="favoritos"
              className="px-4 py-3 data-[hover=true]:bg-[#ffcce9] rounded-lg mx-2 my-1"
              startContent={
                <Image
                  className="h-[24px] w-[24px]"
                  src="/icons/favoritos.svg"
                  alt="Favoritos"
                  width={24}
                  height={24}
                />
              }
            >
              <Link
                href="/dashboard/favoritos"
                className="text-[#FC68B9] text-base font-semibold w-full block"
              >
                Favoritos
              </Link>
            </DropdownItem>

            <DropdownItem
              key="cerrar-sesion"
              onClick={handleLogout}
              className="px-4 py-3 data-[hover=true]:bg-[#ffcce9] rounded-lg mx-2 my-1"
              startContent={
                <Image
                  className="h-[24px] w-[24px]"
                  src="/icons/cerrarSesion.svg"
                  alt="Cerrar sesión"
                  width={24}
                  height={24}
                />
              }
            >
              <span className="text-[#FC68B9] text-base font-semibold">
                Cerrar Sesión
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
