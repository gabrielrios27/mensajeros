import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableUploadComponent } from './variable-upload.component';

describe('VariableUploadComponent', () => {
  let component: VariableUploadComponent;
  let fixture: ComponentFixture<VariableUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
