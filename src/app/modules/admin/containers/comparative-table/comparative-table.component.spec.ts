import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeTableComponent } from './comparative-table.component';

describe('ComparativeTableComponent', () => {
  let component: ComparativeTableComponent;
  let fixture: ComponentFixture<ComparativeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
