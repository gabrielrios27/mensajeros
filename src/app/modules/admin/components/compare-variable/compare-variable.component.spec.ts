import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareVariableComponent } from './compare-variable.component';

describe('CompareVariableComponent', () => {
  let component: CompareVariableComponent;
  let fixture: ComponentFixture<CompareVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
