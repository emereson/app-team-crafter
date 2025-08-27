"use client";

import { cn, Pagination, PaginationItemType } from "@heroui/react";
import type { PaginationItemRenderProps } from "@heroui/react";
import Image from "next/image";
import CardRecursos from "../../components/CardRecursos";
import { useCallback, useEffect, useState } from "react";
import { Recurso } from "@/interfaces/recurso.interface";
import { getRecursos } from "@/services/recursos.service";
import { handleAxiosError } from "@/utils/errorHandler";
import Loading from "@/app/components/Loading";

export default function ListaRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  const gfindRecursos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getRecursos({ cuatro_ultimos: "true" });
      setRecursos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindRecursos();
  }, [gfindRecursos]);

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onNext}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onPrevious}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          "relative  min-w-[40px] min-h-[40px] text-[#68E1E0] font-black text-xl flex items-center justify-center  cursor-pointer ",
          isActive && "text-white "
        )}
        onClick={() => setPage(value)}
      >
        {isActive && (
          <Image
            className="absolute  min-w-[38px] min-h-[38px]"
            src="/icons/starPage.svg"
            alt=" select page"
            width={20}
            height={20}
          />
        )}
        <p className="z-10">{value}</p>
      </button>
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-8 pt-10">
      <div className="w-full flex flex-wrap gap-[20px] ">
        {recursos.map((recurso) => (
          <CardRecursos key={recurso.id} recurso={recurso} />
        ))}
      </div>
      <Pagination
        disableCursorAnimation
        showControls
        className="gap-4 mt-8"
        initialPage={1}
        renderItem={renderItem}
        total={8}
        boundaries={3}
        variant="light"
      />
    </section>
  );
}
