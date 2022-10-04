import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesShowComponent } from './variables-show.component';

describe('VariablesShowComponent', () => {
  let component: VariablesShowComponent;
  let fixture: ComponentFixture<VariablesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariablesShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
