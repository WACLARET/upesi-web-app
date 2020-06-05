import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryMobileWalletsComponent } from './beneficiary-mobile-wallets.component';

describe('BeneficiaryMobileWalletsComponent', () => {
  let component: BeneficiaryMobileWalletsComponent;
  let fixture: ComponentFixture<BeneficiaryMobileWalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryMobileWalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryMobileWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
