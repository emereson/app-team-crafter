import LoadingTransparente from "@/app/components/LoadingTransparente";
import { ConfigNotificacion } from "@/interfaces/configNotificacion.interface";
import {
  getConfigNotificacion,
  updateConfigNotificacion,
} from "@/services/configNotificacion.service";
import { handleAxiosError } from "@/utils/errorHandler";
import { Switch } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

export default function NavNotificaciones() {
  const [congifNotificacion, setcongifNotificacion] =
    useState<ConfigNotificacion>();
  const [noticias, setNoticias] = useState<boolean>(false);
  const [promociones, setPromociones] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const gfindNotificaciones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getConfigNotificacion();
      setcongifNotificacion(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindNotificaciones();
  }, [gfindNotificaciones]);

  useEffect(() => {
    if (congifNotificacion) {
      setNoticias(congifNotificacion?.noticias);
      setPromociones(congifNotificacion?.promociones);
    }
  }, [congifNotificacion]);

  const updatedNotificaciones = useCallback(
    async (data: ConfigNotificacion) => {
      setLoading(true);
      try {
        const res = await updateConfigNotificacion(data);
        setcongifNotificacion(res);
      } catch (err) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <section className="w-full flex flex-col gap-6 text-[#8A8A8A] font-medium">
      {loading && <LoadingTransparente />}
      <h2 className="text-2xl text-[#8A8A8A] font-bold ">Notificaciones</h2>
      <article className="w-full flex justify-between">
        <h3>Noticias y actualizaciones</h3>
        <Switch
          classNames={{
            wrapper: "bg-[#FFE1F2] group-data-[selected=true]:bg-[#FC68B9]",
          }}
          isSelected={noticias}
          onValueChange={(val) => {
            setNoticias(val);
            updatedNotificaciones({ noticias: val, promociones }); // siempre envío los dos
          }}
        />
      </article>
      <article className="w-full flex justify-between">
        <h3>Promociones</h3>
        <Switch
          classNames={{
            wrapper: "bg-[#FFE1F2] group-data-[selected=true]:bg-[#FC68B9]",
          }}
          isSelected={promociones}
          onValueChange={(val) => {
            setPromociones(val);
            updatedNotificaciones({ noticias, promociones: val }); // siempre envío los dos
          }}
        />
      </article>
    </section>
  );
}
