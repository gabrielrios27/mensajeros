export interface axes {
  id: number;
  nombre: string;
}
export interface role {
  authority: string;
}
export interface flag {
  flag: boolean;
}
export interface user {
  email: string;
  id: number;
  nombre: string;
}
export interface variable {
  id: number;
  nombre: string;
  tipo?: string;
  descripcion: string;
  eje: {
    id: number;
    nombre: string;
  };
  genero?: string;
  escala_de_valor?: string;
  valor_final?: string;
  valor_inicial?: string;
  etiqueta_final?: string;
  etiqueta_inicial?: string;
}
export interface AxeWithquantity {
  nombre: string;
  id: number;
  cantidad: string;
}
