import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAxesComponent } from './add-axes.component';

describe('AddAxesComponent', () => {
  let component: AddAxesComponent;
  let fixture: ComponentFixture<AddAxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
