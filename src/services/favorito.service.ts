import instance from "./auth/axiosInstance";

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
