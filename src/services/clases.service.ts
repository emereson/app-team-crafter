import instance from "./auth/axiosInstance";

export async function getClases() {
  const res = await instance.get(`/clase`);

  return res.data.clases;
}

export async function getClasesId(id: number | string) {
  const res = await instance.get(`/clase/${id}`);

  return res.data.clase;
}

export async function getLikeClase(id: number | string) {
  const res = await instance.get(`/clase/${id}`);

  return res.data.clase;
}

export async function getViewClase(id: number | string) {
  await instance.get(`/clase/view/${id}`);
  return true;
}

// export async function postClase(data: FormClase) {
//   const res = await instance.post(`/clase`, data);

//   return res.data.clase;
// }

// export async function updateClase(data: FormClase, id: number) {
//   const res = await instance.patch(`/clase/${id}`, data);

//   return res.data.clase;
// }
