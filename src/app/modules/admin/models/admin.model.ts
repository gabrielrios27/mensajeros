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
  tipo: string;
  descripcion: string;
  eje: {
    id: number;
    nombre: string;
  };
  genero?: string;
  escala_valor?: string;
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
export interface ReceivedReport {
  idReporte: number;
  idCentro: number;
  nom_centro: string;
  fecha_completado: string;
  nombreReporte: string;
  comentarios: Comments[];
}
export interface Comments {
  id: number;
  observacion: string;
}
export interface DownloadExcel {
  description: string;
  filename: string;
  inputStream: {};
  open: boolean;
  readable: boolean;
  uri: string;
  url: string;
}
export interface ReportByCenter {
  idReporte: number;
  nombreReporte: string;
}
export interface VariableInCommon {
  descripcion: string;
  id: number;
  nombre: string;
}
export interface BodyComparativeReport {
  descripcion?: string;
  idCentro: number;
  idReporte1: number;
  idReporte2: number;
  variables: number[];
}
export interface ComparativeReports {
  carga1: Charge;
  carga2: Charge;
  descripcion: string;
  id: number;
}

export interface Charge {
  ejeActual: number;
  fechaCompletado: Date;
  idCentro: number;
  idReporte: number;
  nombre: string;
  observacion: string;
  periodoDesde: Date;
  periodoHasta: Date;
  respuestas: ResponseReport[];
  totalEjes: number;
  variables: variable[];
}

export interface ResponseReport {
  escala: number;
  femenino: number;
  idVariable: number;
  masculino: number;
  noBinario: number;
  numerico: number;
  observaciones: string;
  textual: string;
}
