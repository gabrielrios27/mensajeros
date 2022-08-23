import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecsAxesVariablesComponent } from './selecs-axes-variables.component';

describe('SelecsAxesVariablesComponent', () => {
  let component: SelecsAxesVariablesComponent;
  let fixture: ComponentFixture<SelecsAxesVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecsAxesVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecsAxesVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
