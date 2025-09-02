import instance from "./auth/axiosInstance";
import { GetClasesParams } from "./clases.service";

export async function getFavoritos() {
  const res = await instance.get(`/favorito`);

  return res.data.favoritos;
}

export async function postFavorito(id: number) {
  const res = await instance.post(`/favorito/${id}`);

  return res.data.favoritos;
}

export async function deleteFavorito(id: number) {
  const res = await instance.delete(`/favorito/${id}`);

  return res.data.favoritos;
}

export async function getFavoritosView(params: GetClasesParams = {}) {
  const query = new URLSearchParams({
    categoria_clase: params.categoria_clase || "",
    tutoriales_tips: params.tutoriales_tips || "",
    cuatro_ultimos: params.cuatro_ultimos || "",
    order: params.order || "",
  }).toString();

  const res = await instance.get(`/favorito/view?${query}`);

  return res.data.favoritos;
}
