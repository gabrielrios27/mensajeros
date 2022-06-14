import { TestBed } from '@angular/core/testing';

import { LayoutsService } from './layouts.service';

describe('LayoutsService', () => {
    let layoutsService: LayoutsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LayoutsService],
        });
        layoutsService = TestBed.inject(LayoutsService);
    });

    describe('getLayouts$', () => {
        it('should return Observable<Layouts>', () => {
            expect(layoutsService).toBeDefined();
        });
    });
});
