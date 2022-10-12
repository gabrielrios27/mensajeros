import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionOfVariableComponent } from './evolution-of-variable.component';

describe('EvolutionOfVariableComponent', () => {
  let component: EvolutionOfVariableComponent;
  let fixture: ComponentFixture<EvolutionOfVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionOfVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionOfVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
