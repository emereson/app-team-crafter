import { getSuscripciones } from "@/services/auth/suscripcion.service";
import { Suscripcion } from "@/stores/SuscripcionContext";
import { handleAxiosError } from "@/utils/errorHandler";
import { formatDate } from "@/utils/formatDate";
import { planes } from "@/utils/planes";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

export default function InformacionSuscripcion() {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);

  const gfindsuscripciones = useCallback(async () => {
    try {
      const res = await getSuscripciones();

      setSuscripciones(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindsuscripciones();
  }, []);

  const suscripcionActiva = suscripciones.find((s) => s.status === "activa");

  const planActivo = planes.find((p) => p.id === suscripcionActiva?.plan_id);

  return (
    <section className="w-full max-w-7xl mx-auto p-8  pb-24 flex flex-col gap-6">
      <h2 className="text-[#8A8A8A] font-bold text-2xl">Información de plan</h2>
      {planes.map((plan) => (
        <article
          key={plan.id}
          className={`w-full p-4 px-5 ${
            planActivo?.id === plan.id
              ? "border-3  border-[#FC68B9] text-[#8A8A8A]"
              : "border-2  border-[#C5C5C5] text-[#C5C5C5] "
          }   rounded-2xl flex justify-between `}
        >
          <div className=" flex flex-col justify-between">
            <span
              className={`w-6 h-6 rounded-full ${
                planActivo?.id === plan.id ? "border-7" : "border-2"
              }  border-[#FC68B9]`}
            />
            <Button
              className={`${
                planActivo?.id === plan.id ? "bg-[#FC68B9]" : "bg-[#C5C5C5]"
              } text-white text-lg font-black px-7`}
              radius="full"
            >
              {plan.nombre_plan}
            </Button>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-medium">${plan.precio_plan} USD</h3>
            <h4 className="font-bold">{plan.titulo}</h4>
            <p
              className={`${
                planActivo?.id === plan.id ? "text-[#FC68B9]" : "text-[#C5C5C5]"
              } text-sm font-semibold`}
            >
              {plan.descripcion}
            </p>
          </div>
        </article>
      ))}

      <h2 className="text-[#8A8A8A] font-bold text-2xl mt-4">
        Historial Suscripciones
      </h2>

      <Table
        aria-label="Example static collection table"
        classNames={{ wrapper: "p-1" }}
      >
        <TableHeader>
          <TableColumn>PLAN</TableColumn>
          <TableColumn>PRECIO</TableColumn>
          <TableColumn>FECHA INICIO</TableColumn>
          <TableColumn>FECHA FINAL</TableColumn>
          <TableColumn>ESTADO</TableColumn>
        </TableHeader>
        <TableBody>
          {suscripciones.map((suscripcion) => (
            <TableRow key={suscripcion.id}>
              <TableCell>{suscripcion.plan.nombre_plan}</TableCell>
              <TableCell>${suscripcion.precio.toFixed(2)}</TableCell>
              <TableCell>{formatDate(suscripcion.startDate)}</TableCell>
              <TableCell>{formatDate(suscripcion.endDate)}</TableCell>

              <TableCell>{suscripcion.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
