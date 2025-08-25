export type Signup = {
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  telefono: string;
  codigo_pais: string;
};

export type Login = {
  correo: string;
  password: string;
};
