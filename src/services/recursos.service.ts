import instance from "./auth/axiosInstance";

interface GetRecursoParams {
  categoria_recurso?: string | null;
  tipo_recurso?: string | null;
  cuatro_ultimos?: string;
  order?: string;
}

export async function getRecursos(params: GetRecursoParams = {}) {
  const query = new URLSearchParams({
    categoria_recurso: params.categoria_recurso || "",
    tipo_recurso: params.tipo_recurso || "",
    cuatro_ultimos: params.cuatro_ultimos || "",
    order: params.order || "",
  }).toString();

  const res = await instance.get(`/recurso?${query}`);

  return res.data.recursos;
}

// export async function updateClase(data: FormClase, id: number) {
//   const res = await instance.patch(`/clase/${id}`, data);

//   return res.data.clase;
// }
