import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModCenterComponent } from './add-mod-center.component';

describe('AddModCenterComponent', () => {
  let component: AddModCenterComponent;
  let fixture: ComponentFixture<AddModCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
