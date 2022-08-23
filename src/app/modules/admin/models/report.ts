import { variable } from './admin.model';
import { Centro } from './centro';
export interface Report {
    centros: Centro,
    fechaCreacion: Date
    fechaEntrega: Date,
    id: number,
    nombre: string,
    variables: variable
}
