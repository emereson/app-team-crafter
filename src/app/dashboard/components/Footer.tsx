"use client";

import { Divider, Link } from "@heroui/react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const classLink =
    "w-[50px] h-[50px] rounded-lg bg-[#FFB4DF] text-[#FC68B9] text-3xl hover:bg-[#FFB4DF] flex items-center justify-center transition-colors duration-300";

  const links = [
    {
      id: 1,
      href: "https://www.facebook.com/TeamCrafter",
      icon: <FaFacebook />,
    },
    {
      id: 2,
      href: "https://www.facebook.com/TeamCrafter",
      icon: <FaInstagram />,
    },
    {
      id: 3,
      href: "https://www.facebook.com/TeamCrafter",
      icon: <FaTiktok />,
    },
    {
      id: 4,
      href: "https://www.facebook.com/TeamCrafter",
      icon: <FaYoutube />,
    },
    {
      id: 5,
      href: "https://www.facebook.com/TeamCrafter",
      icon: <FaWhatsapp />,
    },
  ];

  const links2 = [
    {
      id: 1,
      href: "https://www.facebook.com/TeamCrafter",
      text: "Política de Privacidad",
    },
    {
      id: 2,
      href: "https://www.facebook.com/TeamCrafter",
      text: "Términos y Condiciones",
    },
    {
      id: 3,
      href: "https://www.facebook.com/TeamCrafter",
      text: "Configuración de Cookies",
    },
  ];
  return (
    <footer className=" bg-[#FC68B9]">
      <section className="w-full p-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={classLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <article className="flex items-center gap-4">
          <Image
            src="/icons/libroReclamaciones.svg"
            alt="Libro de reclamaciones"
            width={38}
            height={28}
          />
          <Link
            className="text-white font-bold underline"
            href="/libro-reclamaciones"
            target="_blank"
            rel="noopener noreferrer"
          >
            Libro de reclamaciones
          </Link>
        </article>
      </section>
      <Divider className="bg-white  " />
      <section className="w-full p-10 flex flex-col items-center justify-center gap-3 ">
        <h2 className="text-white  font-[Reboto]">
          © 2024 - GLORIA LOBATÓN DISEÑO & SCRAP - MODO CRAFTER / TODOS LOS
          DERECHOS RESERVADOS.
        </h2>
        <div className="flex items-center gap-6">
          {links2.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-white  text-sm font-medium underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  );
}
