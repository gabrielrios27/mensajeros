import { TestBed } from '@angular/core/testing';

import { LayoutsGuard } from './layouts.guard';

describe('Layouts Guards', () => {
    let layoutsGuard: LayoutsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [LayoutsGuard],
        });
        layoutsGuard = TestBed.inject(LayoutsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            layoutsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
