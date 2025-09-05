import { DatosCliente } from "@/interfaces/user.type";
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
  const [datosCliente, setDatosCliente] = useState<DatosCliente>();

  const gfindsuscripciones = useCallback(async () => {
    try {
      const res = await getSuscripciones();
      console.log("📌 getSuscripciones ->", res);

      setSuscripciones(res.suscripciones.data);
      setDatosCliente(res.datosClientes);
    } catch (err) {
      handleAxiosError(err);
    }
  }, []);

  useEffect(() => {
    gfindsuscripciones();
  }, []);

  const suscripcionActiva = suscripciones.find((s) => s.status === 1);

  const planActivo = planes.find(
    (p) => p.flow_plan_id === suscripcionActiva?.planExternalId
  );

  const planSuscripcion = (planExternalId: string) => {
    const planActivo = planes.find(
      (p) => p.flow_plan_id === suscripcionActiva?.planExternalId
    );

    return planActivo;
  };

  return (
    <section
      className="w-full max-w-7xl mx-auto p-8  pb-24 flex flex-col gap-6 
    max-sm:px-0
    "
    >
      <h2 className="text-[#8A8A8A] font-bold text-2xl max-sm:text-xl">
        Información de plan
      </h2>
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
              } text-white text-lg font-black px-7 max-sm:text-sm max-sm:px-4`}
              radius="full"
            >
              {plan.nombre_plan}
            </Button>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-medium max-sm:text-2xl">
              ${plan.precio_plan} USD
            </h3>
            <h4 className="font-bold max-sm:text-sm">{plan.titulo}</h4>
            <p
              className={`${
                planActivo?.id === plan.id ? "text-[#FC68B9]" : "text-[#C5C5C5]"
              } text-sm font-semibold max-sm:text-xs `}
            >
              {plan.descripcion}
            </p>
          </div>
        </article>
      ))}

      <h2 className="text-[#8A8A8A] font-bold text-2xl mt-4 max-sm:text-xl">
        Método de pago
      </h2>
      <article
        className="w-fit border-1 border-[#CBD5E1] rounded-lg p-4 flex gap-4 text-[#8A8A8A] justify-start items-start
      max-sm:w-full
      "
      >
        <img
          src={`/icons/${
            datosCliente?.creditCardType === "MASTERCARD"
              ? "mastercard.svg"
              : "visa.svg"
          }`}
          alt=""
        />
        <div>
          <h3 className="font-medium">
            {datosCliente?.creditCardType} que termina en{" "}
            {datosCliente?.last4CardDigits}
          </h3>
          <p className="mt-2">{datosCliente?.email}</p>
        </div>
      </article>

      <h2 className="text-[#8A8A8A] font-bold text-2xl mt-4 max-sm:text-xl">
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
          {suscripciones.map((suscripcion, index) => (
            <TableRow key={index}>
              <TableCell>
                {planSuscripcion(suscripcion.planExternalId)?.nombre_plan}
              </TableCell>
              <TableCell>
                $
                {planSuscripcion(
                  suscripcion.planExternalId
                )?.precio_plan.toFixed(2)}
              </TableCell>
              <TableCell>{formatDate(suscripcion.period_start)}</TableCell>
              <TableCell>{formatDate(suscripcion.period_end)}</TableCell>

              <TableCell>
                {suscripcion.status === 1 ? "activo" : "vencido"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
