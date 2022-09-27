import { variable } from './admin.model';
import { Answers } from './reponse';
export interface ReportRecived {
    centros: Array<any>,
    fechaCompletado: string
    id: any,
    nombre: string,
    variables: Array<any>
    periodoDesde : string
    periodoHasta : string
    respuestas: Array<Answers>
}
