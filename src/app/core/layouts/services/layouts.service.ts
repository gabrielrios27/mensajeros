import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class LayoutsService {
    constructor() {}

    getLayouts$(): Observable<{}> {
        return of({});
    }

}
