import instance from "./auth/axiosInstance";

interface GetRecursoParams {
  categoria_clase?: string | null;
  tutoriales_tips?: string | null;
  cuatro_ultimos?: string;
}

export async function getRecursos(params: GetRecursoParams = {}) {
  const query = new URLSearchParams({
    categoria_clase: params.categoria_clase || "",
    tutoriales_tips: params.tutoriales_tips || "",
    cuatro_ultimos: params.cuatro_ultimos || "",
  }).toString();

  const res = await instance.get(`/recurso?${query}`);

  return res.data.recursos;
}

export async function deleteRecurso(id: number) {
  const res = await instance.delete(`/recurso/${id}`);

  return res.data.clase;
}

// export async function updateClase(data: FormClase, id: number) {
//   const res = await instance.patch(`/clase/${id}`, data);

//   return res.data.clase;
// }
