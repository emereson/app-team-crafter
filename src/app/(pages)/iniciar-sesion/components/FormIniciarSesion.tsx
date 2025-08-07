"use client";

import { inputClassNames } from "@/utils/classNames";
import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type LoginFormInputs = {
  correo: string;
  password: string;
};
export default function FormIniciarSesion() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <section className="w-full min-w-[300px]  h-full bg-white p-6  rounded-2xl  flex flex-col justify-center items-center  gap-10 ">
      <Image
        className="w-[190px]"
        src="/logo.png"
        alt="ps y ai"
        width={800}
        height={800}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full max-w-[500px] flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full flex flex-col gap-8">
          <Input
            isRequired
            classNames={inputClassNames}
            label="Correo electrónico"
            placeholder="Escribe tu correo"
            labelPlacement="outside"
            type="email"
            {...register("correo")}
            errorMessage="El correo es obligatorio"
            radius="full"
          />
          <Input
            isRequired
            classNames={inputClassNames}
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            labelPlacement="outside"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            errorMessage="La contraseña es obligatoria"
            endContent={
              <button
                className="cursor-pointer"
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {showPassword ? (
                  <AiOutlineEye className="text-2xl text-gray flex-shrink-0" />
                ) : (
                  <AiOutlineEyeInvisible className="text-2xl text-gray flex-shrink-0" />
                )}
              </button>
            }
            radius="full"
          />
        </div>
        <Link
          href="/recuperar-contraseña"
          className="color-pink text-base font-semibold"
        >
          Olvidaste tu contraseña?
        </Link>
        <Button
          className="bg-[#E2E6F5] text-white text-xl font-semibold px-8 py-6 border-3 border-[#E2E6F5] hover:bg-[#fc68b9] hover:border-[#FFEE97] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
          radius="full"
          type="submit"
        >
          Iniciar sesión
        </Button>
      </form>
      <div className="text-sm flex gap-2">
        <p className="text-gray ">¿No tienes una cuenta?</p>
        <Link
          href="/recuperar-contraseña"
          className="color-pink  font-semibold"
        >
          Suscríbete
        </Link>
      </div>
    </section>
  );
}
