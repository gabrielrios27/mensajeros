import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AdminService {
    constructor() {}

    getAdmin$(): Observable<{}> {
        return of({});
    }

}
