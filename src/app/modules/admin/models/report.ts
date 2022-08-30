import { variable } from './admin.model';
import { Centro } from './centro';
export interface Report {
    centros: Array<any>,
    fechaCreacion: string
    fechaEntrega: string,
    id: any,
    nombre: string,
    variables: Array<any>
    periodoDesde : string
    periodoHasta : string
}
