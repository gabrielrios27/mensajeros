import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
    constructor() {}

    getUser$(): Observable<{}> {
        return of({});
    }

}
