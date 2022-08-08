import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesGroupComponent } from './variables-group.component';

describe('VariablesGroupComponent', () => {
  let component: VariablesGroupComponent;
  let fixture: ComponentFixture<VariablesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
