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

export async function patchMigrarSuscripcion(
  id: string,
  data: { planExternalId: string }
) {
  try {
    const res = await instance.patch(`/suscripcion/${id}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelarSuscripcion(id: string) {
  try {
    const res = await instance.delete(`/suscripcion/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
}
