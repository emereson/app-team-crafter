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

export default function Header() {
  return (
    <header className="w-screen h-[80px] px-20 bg-[#fc68b9] flex items-center justify-between">
      <Image
        className="h-[54px] w-auto"
        src="/logo.png"
        alt="Logo PS y AI"
        width={200}
        height={200}
        priority
      />
      <form className="relative   w-full max-w-xl ml-20 bg-[#FFE1F2]  flex items-center rounded-full overflow-hidden">
        <input
          className="py-2.5 px-5  placeholder:text-[#FFB4DF] text-lg  font-bold"
          type="text"
          placeholder="Buscar"
        />
        <button className="absolute right-0 h-full p-3 px-5 hover:bg-[#ffd2ec] cursor-pointer">
          <Image
            className="h-full w-auto"
            src="/icons/search.svg"
            alt="Buscar"
            width={100}
            height={100}
          />
        </button>
      </form>
      <div className="flex items-center gap-2">
        <Link href={"/dashboard/notificaciones"}>
          <Image
            className="h-[40px] w-auto"
            src="/icons/notification.svg"
            alt="notificaciones"
            width={100}
            height={100}
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
                className="h-[40px] w-[40px]  border-1 border-[#68E1E0] rounded-full"
                src="/avatar.png"
                alt="notificaciones"
                width={100}
                height={100}
              />
              <p className="text-base font-bold">Natalia Tobar</p>
              <RiArrowDownSLine className=" text-2xl" />
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
