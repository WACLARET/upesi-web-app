import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryBankComponent } from './beneficiary-bank.component';

describe('BeneficiaryBankComponent', () => {
  let component: BeneficiaryBankComponent;
  let fixture: ComponentFixture<BeneficiaryBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
