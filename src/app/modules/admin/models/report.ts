import { variable } from './admin.model';
export interface Report {
    nombre: string
    fechaCreacion: Date
    fechaEntrega: Date
    id: number
    variables: variable
}
