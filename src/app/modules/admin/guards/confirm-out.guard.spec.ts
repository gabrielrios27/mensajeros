import { TestBed } from '@angular/core/testing';

import { ConfirmOutGuard } from './confirm-out.guard';

describe('ConfirmOutGuard', () => {
  let guard: ConfirmOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
