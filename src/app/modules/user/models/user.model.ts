import { variable } from '../../admin/models';

export interface UserData {
  centros: CenterOfUser[];
  contrasena: string;
  email: string;
  id: 0;
  nombre: string;
}
export interface CenterOfUser {
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

export interface VariableRep {
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
  respuesta: ReportResponse;
}

export interface ReportToUpload {
  fechaCompletado: Date;
  idCentro: number;
  idReporte: number;
  respuestas: ReportResponse[];
  variables: VariableRep[];
  ejeActual: number;
  totalEjes: number;
  ejesConVariables: AxeAndVariables[];
}
export interface ReportInfo {
  fecha_entrega: string;
  idCentro: number;
  idReporte: number;
  nom_centro: string;
  nombreReporte: string;
  periodo_desde: string;
  periodo_hasta: string;
  reporteACargar: ReportToUpload;
  ejesConVariables: AxeAndVariables[];
}
export interface AxeAndVariables {
  axe: string;
  variables: VariableRep[];
  responses: ReportResponse[];
  complete: boolean;
  idAxe: number;
}
