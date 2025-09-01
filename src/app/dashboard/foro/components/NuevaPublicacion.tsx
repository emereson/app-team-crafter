import { inputClassNames, selectClassNames } from "@/utils/classNames";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import { useCallback, useRef, useState } from "react";
import { FormForo } from "@/interfaces/foro.interface";
import { useForm } from "react-hook-form";
import { postForo } from "@/services/foro.service";
import { toast } from "sonner";
import { handleAxiosError } from "@/utils/errorHandler";

interface Props {
  gfindForos: () => void;
}

export default function NuevaPublicacion({ gfindForos }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<FormForo>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    async (data: FormForo) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("titulo_foro", data.titulo_foro);
        formData.append("contenido_foro", data.contenido_foro);
        formData.append("categoria_foro", data.categoria_foro);

        if (selectedImage) {
          formData.append("img", selectedImage);
        }

        await postForo(formData);
        gfindForos();
        reset();
        toast.success("El foro se publico correctamente");
        removeImage();
        onClose();
      } catch (err: unknown) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    [selectedImage]
  );

  return (
    <section className="w-full flex flex-col gap-4 -mt-2">
      <div className="w-full h-[70px] flex justify-end items-center border-1 border-[#FFB4DF] rounded-2xl px-4">
        <Button
          className="relative min-w-1 w-[40px] h-[40px] p-0 bg-[#FC68B9]"
          onPress={onOpen}
        >
          <LuPlus className="text-white text-xl" />
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="w-full p-4">
          {(onClose) => (
            <form
              className="w-full p-4 flex flex-col gap-4 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="text-2xl text-[#68E1E0] font-bold">
                Nueva publicación
              </h2>

              <Input
                isRequired
                classNames={inputClassNames}
                label="Titular"
                placeholder="Escribe aquí el título..."
                labelPlacement="outside"
                type="text"
                errorMessage="El titular es obligatorio"
                {...register("titulo_foro")}
                radius="full"
              />

              <Textarea
                isRequired
                classNames={inputClassNames}
                label="Contenido"
                placeholder="Describe tu idea o pregunta aquí..."
                labelPlacement="outside"
                errorMessage="El contenido es obligatorio"
                {...register("contenido_foro")}
                radius="full"
                minRows={4}
              />

              {/* Input file oculto */}
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* Botón para subir imagen */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="flex items-center gap-2 p-3 cursor-pointer"
                >
                  <Image
                    src="/icons/clip.svg"
                    alt="Subir Imagen"
                    width={24}
                    height={24}
                  />
                  <p className="text-[#FC68B9] font-semibold underline">
                    {selectedImage
                      ? `Imagen seleccionada: ${selectedImage.name}`
                      : "Subir Imagen"}
                  </p>
                </button>

                {/* Preview de la imagen */}
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
              <Select
                isRequired
                label="Categoría"
                classNames={selectClassNames}
                listboxProps={{
                  itemClasses: {
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-[#F1F6FB]",
                      "dark:data-[hover=true]:bg-[#F1F6FB]",
                      "data-[selectable=true]:focus:bg-[#F1F6FB]",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  },
                }}
                labelPlacement="outside"
                {...register("categoria_foro")}
                defaultSelectedKeys={["Consejos"]}
              >
                <SelectItem key="Consejos">Consejos</SelectItem>
              </Select>

              <div className="w-full flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  className="bg-white text-[#FC68B9]  font-semibold border-1 border-[#FC68B9]  "
                  radius="full"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FC68B9] text-white font-semibold"
                  radius="full"
                >
                  {loading ? "cargando ... " : "Publicar"}
                </Button>
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
