import { variable } from '../../admin/models';

export interface UserData {
  centros: [
    {
      nombre: string;
    }
  ];
  contrasena: string;
  email: string;
  id: 0;
  nombre: string;
}

export interface ReportResponse {
  escala: number;
  femenino: number;
  idVariable: number;
  masculino: number;
  noBinario: number;
  numerico: number;
  observaciones: string;
  textual: string;
}

export interface Axe {
  id: number;
  nombre: string;
}

export interface Variable {
  descripcion: string;
  eje: Axe;
  escala_valor: string;
  etiqueta_final: string;
  etiqueta_inicial: string;
  genero: string;
  id: number;
  nombre: string;
  tipo: string;
  valor_final: string;
  valor_inicial: string;
}

export interface ReportToUpload {
  fechaCompletado: Date;
  idCentro: number;
  idReporte: number;
  respuestas: ReportResponse[];
  variables: Variable[];
}
export interface ReportInfo {
  fecha_entrega: string;
  idCentro: 0;
  idReporte: 0;
  nom_centro: string;
  nombreReporte: string;
  periodo_desde: string;
  periodo_hasta: string;
  reporteACargar?: ReportToUpload;
  cantidadDeEjes?: number;
  ultimoEjeCompleto?: number;
}
export interface AxeAndVariables {
  axe: string;
  variables: variable[];
}
