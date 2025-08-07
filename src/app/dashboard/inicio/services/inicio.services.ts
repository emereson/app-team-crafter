import instance from "@/services/axiosInstance";

export async function getImagenesCarrusel() {
  try {
    const res = await instance.get(`/post-wp/images-carrusel`);
    return res.data; // Retorna los datos de las aulas
  } catch (error) {
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
}
