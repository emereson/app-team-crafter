import { Login, Signup } from "@/interfaces/auth.type";
import instance from "./axiosInstance";
import { setToken } from "@/utils/authUtils";

export async function postLogin(data: Login) {
  try {
    const res = await instance.post(`/user/login`, data);
    setToken(res.data.token);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function postSignup(data: Signup, plan: string | null) {
  try {
    const res = await instance.post(`/user/signup`, { ...data, plan: plan });
    console.log(res);

    setToken(res.data.token);

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getPerfilRegistrarTarjeta() {
  try {
    const res = await instance.get(`/user/registrar-tarjeta`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getPerfil() {
  try {
    const res = await instance.get(`/user/perfil`);

    return res.data.perfil;
  } catch (error) {
    throw error;
  }
}

export async function updatePerfil(id: string, data: FormData) {
  try {
    const res = await instance.patch(`/user/${id}`, data);

    return res.data.user;
  } catch (error) {
    throw error;
  }
}

export async function verificarCorreo(token: string) {
  try {
    const res = await instance.get(`/user/verificar-correo/${token}`);

    return res.data.perfil;
  } catch (error) {
    throw error;
  }
}

export async function nuevoPasswordCorreo(correo: string) {
  try {
    const res = await instance.post(`/user/correo-password`, {
      correo: correo,
    });

    return res.data.perfil;
  } catch (error) {
    throw error;
  }
}

export async function nuevoPassword(password: string, token: string) {
  try {
    const res = await instance.post(`/user/nuevo-password/${token}`, {
      password,
    });

    return res.data.perfil;
  } catch (error) {
    throw error;
  }
}
