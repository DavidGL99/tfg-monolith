import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostReviewedComponent } from './most-reviewed.component';

describe('MostReviewedComponent', () => {
  let component: MostReviewedComponent;
  let fixture: ComponentFixture<MostReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
