import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOutModalComponent } from './confirm-out-modal.component';

describe('ConfirmOutModalComponent', () => {
  let component: ConfirmOutModalComponent;
  let fixture: ComponentFixture<ConfirmOutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOutModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
