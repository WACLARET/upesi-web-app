import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryLocationComponent } from './beneficiary-location.component';

describe('BeneficiaryLocationComponent', () => {
  let component: BeneficiaryLocationComponent;
  let fixture: ComponentFixture<BeneficiaryLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
