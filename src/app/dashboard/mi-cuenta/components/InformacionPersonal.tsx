import { User } from "@/interfaces/user.type";
import { updatePerfil } from "@/services/auth/auth.service";
import { usePerfilStore } from "@/stores/perfil.store";
import { inputClassNames3, inputClassNames4 } from "@/utils/classNames";
import { handleAxiosError } from "@/utils/errorHandler";
import { Avatar, Button, Input } from "@heroui/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";

export default function InformacionPersonal() {
  const perfil = usePerfilStore((state) => state.perfil);
  const setPerfil = usePerfilStore((state) => state.setPerfil);

  const { register, handleSubmit, reset, control } = useForm<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);

        // Crear preview de la imagen
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor selecciona un archivo de imagen válido");
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = useCallback(
    async (data: User) => {
      if (perfil) {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("nombre", data.nombre);
          formData.append("apellidos", data.apellidos);
          formData.append("telefono", data.telefono);
          formData.append("codigo_pais", data.codigo_pais);
          formData.append("dni_id_ce", data.dni_id_ce || "");
          formData.append("newPassword", data.password);

          if (selectedImage) {
            formData.append("img", selectedImage);
          }

          const res = await updatePerfil(perfil.id, formData);
          setPerfil(res);
          reset();
          toast.success("Los daots se actualizaron  correctamente");
          removeImage();
        } catch (err: unknown) {
          handleAxiosError(err);
        } finally {
          setLoading(false);
        }
      }
    },
    [selectedImage, perfil, reset, setPerfil]
  );

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-2xl text-[#8A8A8A] font-bold ">
        Información personal
      </h2>
      {perfil && (
        <form
          className="w-full flex flex-col gap-4 text-[#8A8A8A] font-medium"
          onSubmit={handleSubmit(onSubmit)}
        >
          <article className="flex justify-between">
            <h3>Fotografía de perfil</h3>
            <div className="w-full max-w-[572px] flex gap-4">
              <Avatar
                className="w-16 h-16 flex-shrink-0"
                src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/img/${perfil?.foto_perfil}`}
                alt={`Avatar de ${perfil?.nombre}`}
              />
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                className="w-full border-1 border-[#8A8A8A] px-4 py-10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={handleImageClick}
              >
                <span className="w-16 h-16 bg-[#FFE1F2] rounded-full flex items-center justify-center">
                  <LiaCloudUploadAltSolid className="text-[#FC68B9] text-3xl" />
                </span>
                <p>
                  <strong className="text-[#FC68B9]">Click to upload</strong> or
                  drag and drop
                </p>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>

                {imagePreview && (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                      width={1000}
                      height={1000}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-[#FC68B9] text-white rounded-full w-8 h-8 flex items-center justify-center text-3xl hover:bg-[#e35aa5] cursor-pointer transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
          <div className="w-full flex gap-2 justify-between">
            <h4>Nombre</h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                {...register("nombre")}
                errorMessage="El nombre es obligatorio"
                radius="md"
                defaultValue={perfil?.nombre}
              />
              <Input
                isRequired
                classNames={inputClassNames3}
                placeholder="Escribe tus apellidos"
                labelPlacement="outside"
                type="text"
                {...register("apellidos")}
                errorMessage="Los Apellidos son obligatorios"
                radius="md"
                defaultValue={perfil?.apellidos}
              />
            </div>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <h4>Correo electrónico</h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                disabled
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                errorMessage="El correo es obligatorio"
                radius="md"
                defaultValue={perfil?.correo}
                startContent={<CiMail className="min-w-8 text-2xl" />}
              />
            </div>
          </div>
          <div className="w-full relative flex  gap-1 justify-between">
            <h4>Teléfono</h4>
            <div className="relative w-full max-w-[572px] flex gap-4 ">
              <Input
                className="absolute right-0 w-[calc(100%-95px)] bottom-0 z-10"
                classNames={inputClassNames4}
                isRequired
                label=""
                labelPlacement="outside"
                type="number"
                {...register("telefono")}
                defaultValue={perfil?.telefono}
              />

              <Controller
                name="codigo_pais"
                control={control}
                defaultValue={perfil?.codigo_pais || ""} // 👈 aquí va el valor inicial
                rules={{ required: "El teléfono es obligatorio" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="relative">
                    <PhoneInput
                      value={value}
                      onChange={(phone) => onChange(phone)}
                      inputStyle={{
                        width: "150px",
                        height: "48px",
                        borderRadius: "12px",
                        border: "1px solid #8A8A8A",
                        paddingLeft: "60px",
                        fontSize: "14px",
                        fontWeight: "400",
                        backgroundColor: "#ffff",
                        color: "#18181b",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                      buttonStyle={{
                        border: "none",
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                        paddingLeft: "16px",
                        paddingRight: "8px",
                      }}
                      containerStyle={{
                        width: "150px",
                      }}
                      dropdownStyle={{
                        borderRadius: "5px",
                        border: "2px solid #8A8A8A",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    {error && (
                      <p className="text-xs text-red-500 mt-1 ml-3">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <h4>DNI/ID/CE</h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                isRequired
                classNames={inputClassNames3}
                labelPlacement="outside"
                type="text"
                {...register("dni_id_ce")}
                errorMessage="El DNI/ID/CE es obligatorio"
                radius="md"
                defaultValue={perfil?.dni_id_ce || ""}
              />
            </div>
          </div>
          <h3 className="text-2xl text-[#8A8A8A] font-bold ">Contraseña</h3>
          <div className="w-full flex gap-2 justify-between">
            <h4>
              Contraseña actual
              <p className="text-[#FC68B9]">Modificar contraseña</p>
            </h4>
            <div className="w-full max-w-[572px] flex gap-4 ">
              <Input
                classNames={inputClassNames3}
                labelPlacement="outside"
                placeholder="****************"
                type="password"
                {...register("password")}
                radius="md"
              />
            </div>
          </div>
          <div className="w-full flex justify-end gap-4 mt-4">
            <Button
              type="submit"
              className="bg-[#FC68B9] text-white font-semibold"
              radius="full"
            >
              {loading ? "cargando ... " : "Guardar"}
            </Button>
          </div>{" "}
        </form>
      )}
    </section>
  );
}
