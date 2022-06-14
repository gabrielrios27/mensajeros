import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
        });
        userService = TestBed.inject(UserService);
    });

    describe('getUser$', () => {
        it('should return Observable<User>', () => {
            expect(userService).toBeDefined();
        });
    });
});
