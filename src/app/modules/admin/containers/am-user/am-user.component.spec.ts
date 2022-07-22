import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmUserComponent } from './am-user.component';

describe('AmUserComponent', () => {
  let component: AmUserComponent;
  let fixture: ComponentFixture<AmUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
