import { variable } from './admin.model';
import { Centro } from './centro';
export interface Report {
    centros: Array<Centro>,
    fechaCreacion: string
    fechaEntrega: string,
    id: any,
    nombre: string,
    variables: Array<number>
    periodoDesde : string
    periodoHasta : string
}
