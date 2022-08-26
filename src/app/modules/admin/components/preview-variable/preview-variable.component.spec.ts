import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewVariableComponent } from './preview-variable.component';

describe('PreviewVariableComponent', () => {
  let component: PreviewVariableComponent;
  let fixture: ComponentFixture<PreviewVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
