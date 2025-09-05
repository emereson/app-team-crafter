import instance from "./axiosInstance";

export async function postSuscripcion(id: number) {
  try {
    const res = await instance.post(`/suscripcion/${id}`);
    console.log(res);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSuscripcion() {
  try {
    const res = await instance.get(`/suscripcion/activa`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSuscripciones() {
  try {
    const res = await instance.get(`/suscripcion`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
