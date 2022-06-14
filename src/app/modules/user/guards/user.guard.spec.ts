import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';

describe('User Guards', () => {
    let userGuard: UserGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [UserGuard],
        });
        userGuard = TestBed.inject(UserGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            userGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
