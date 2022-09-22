import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedReportComponent } from './received-report.component';

describe('ReceivedReportComponent', () => {
  let component: ReceivedReportComponent;
  let fixture: ComponentFixture<ReceivedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
