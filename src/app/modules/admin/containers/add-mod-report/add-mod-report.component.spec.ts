import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModReportComponent } from './add-mod-report.component';

describe('AddModReportComponent', () => {
  let component: AddModReportComponent;
  let fixture: ComponentFixture<AddModReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
