export type User = {
  id: string;
  foto_perfil?: string | null;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  codigo_pais: string;
  zona_horaria?: string | null;
  dni_id_ce?: string | null;
  password: string;
  status: "active" | "disabled";
  emailVerified: boolean;
};
